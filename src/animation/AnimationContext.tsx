import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { AnimationStore } from "./AnimationStore.js";
import { AnimationController } from "./AnimationController.js";
import { matchPartByTransform } from "./parts.js";
import type { AnimationConfig } from "./types.js";
import {
  isDeferredPreset,
  loadDeferredPresetSequence,
  resolvePresetSequenceSync,
} from "./presetResolver.js";

type AnimationContextValue = {
  store: AnimationStore;
  controller: AnimationController;
};

const AnimationContext = createContext<AnimationContextValue | null>(null);

type AnimationProviderProps = {
  animation?: AnimationConfig | null;
  children: ReactNode;
};

function useResolvedAnimationConfig(animation: AnimationConfig | null) {
  const presetName =
    animation && "preset" in animation ? animation.preset : undefined;
  const immediateSequence = presetName
    ? resolvePresetSequenceSync(presetName)
    : undefined;
  const [deferredSequence, setDeferredSequence] = useState<ReturnType<
    typeof resolvePresetSequenceSync
  > | null>(null);

  useEffect(() => {
    if (!presetName || immediateSequence || !isDeferredPreset(presetName)) {
      setDeferredSequence(null);
      return;
    }

    let cancelled = false;

    loadDeferredPresetSequence(presetName)
      .then((sequence) => {
        if (!cancelled) {
          setDeferredSequence(sequence);
        }
      })
      .catch(() => {
        if (!cancelled) {
          setDeferredSequence(null);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [immediateSequence, presetName]);

  return useMemo<AnimationConfig | null>(() => {
    if (!animation) {
      return null;
    }

    if ("sequence" in animation) {
      return animation;
    }

    const resolvedSequence = immediateSequence ?? deferredSequence;
    if (!resolvedSequence) {
      return null;
    }

    const { preset: _preset, ...rest } = animation;
    return {
      ...rest,
      sequence: resolvedSequence,
    };
  }, [animation, deferredSequence, immediateSequence]);
}

export function AnimationProvider({
  animation = null,
  children,
}: AnimationProviderProps) {
  const resolvedAnimation = useResolvedAnimationConfig(animation);
  const store = useMemo(() => new AnimationStore(), []);
  const controller = useMemo(() => new AnimationController(store), [store]);
  const rootRef = useRef<SVGGElement | null>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) {
      return;
    }

    const unregister: Array<() => void> = [];
    root
      .querySelectorAll<SVGGraphicsElement>("g[transform]")
      .forEach((target) => {
        const part = matchPartByTransform(target.getAttribute("transform"));
        if (part) {
          unregister.push(store.registerElement(part, target));
        }
      });

    return () => unregister.forEach((cleanup) => cleanup());
  }, [store]);

  useEffect(() => {
    controller.applyConfig(resolvedAnimation);
    if (!controller.needsAnimationFrame()) {
      return;
    }

    let raf = 0;
    let last = performance.now();

    const tick = (time: number) => {
      const delta = time - last;
      last = time;
      if (controller.update(delta)) {
        raf = requestAnimationFrame(tick);
      }
    };

    const schedule = () => {
      if (
        document.visibilityState === "hidden" ||
        !controller.needsAnimationFrame()
      ) {
        return;
      }
      last = performance.now();
      raf = requestAnimationFrame(tick);
    };

    const onVisibilityChange = () => {
      if (document.visibilityState === "hidden") {
        cancelAnimationFrame(raf);
      } else {
        schedule();
      }
    };

    document.addEventListener("visibilitychange", onVisibilityChange);
    schedule();

    return () => {
      document.removeEventListener("visibilitychange", onVisibilityChange);
      cancelAnimationFrame(raf);
    };
  }, [controller, resolvedAnimation]);

  const value = useMemo<AnimationContextValue>(
    () => ({ store, controller }),
    [store, controller]
  );

  return (
    <AnimationContext.Provider value={value}>
      <g ref={rootRef}>{children}</g>
    </AnimationContext.Provider>
  );
}

export function useAnimationStore() {
  return useContext(AnimationContext)?.store ?? null;
}

export function useAnimationController() {
  const context = useContext(AnimationContext);
  return context?.controller ?? null;
}
