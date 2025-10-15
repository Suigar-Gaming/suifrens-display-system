import { createContext, useContext, useEffect, useMemo, type ReactNode } from "react";
import { AnimationStore } from "./AnimationStore.js";
import { AnimationController } from "./AnimationController.js";
import type { AnimationConfig } from "./types.js";

type AnimationContextValue = {
  store: AnimationStore;
  controller: AnimationController;
};

const AnimationContext = createContext<AnimationContextValue | null>(null);

type AnimationProviderProps = {
  animation?: AnimationConfig | null;
  children: ReactNode;
};

export function AnimationProvider({ animation = null, children }: AnimationProviderProps) {
  const store = useMemo(() => new AnimationStore(), []);
  const controller = useMemo(() => new AnimationController(store), [store]);

  useEffect(() => {
    controller.load(animation);
  }, [controller, animation]);

  useEffect(() => {
    let raf = 0;
    let last = performance.now();

    const tick = (time: number) => {
      const delta = time - last;
      last = time;
      controller.update(delta);
      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame((time) => {
      last = time;
      tick(time);
    });

    return () => cancelAnimationFrame(raf);
  }, [controller]);

  const value = useMemo<AnimationContextValue>(() => ({ store, controller }), [store, controller]);

  return <AnimationContext.Provider value={value}>{children}</AnimationContext.Provider>;
}

export function useAnimationStore() {
  return useContext(AnimationContext)?.store ?? null;
}

export function useAnimationController() {
  const context = useContext(AnimationContext);
  return context?.controller ?? null;
}
