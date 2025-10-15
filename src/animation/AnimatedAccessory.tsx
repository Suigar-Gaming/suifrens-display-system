import {
  cloneElement,
  isValidElement,
  useLayoutEffect,
  useRef,
  type MutableRefObject,
  type ReactElement,
  type Ref,
} from "react";
import { useAnimationStore } from "./AnimationContext.js";
import { matchPartByTransform, type AnimationPart } from "./parts.js";

type AnimatedAccessoryProps = {
  children: ReactElement;
  fallbackPart?: AnimationPart;
};

function mergeRefs<T>(...refs: (Ref<T> | undefined)[]) {
  return (value: T) => {
    for (const ref of refs) {
      if (!ref) continue;
      if (typeof ref === "function") {
        ref(value);
      } else {
        try {
          (ref as MutableRefObject<T | null>).current = value;
        } catch {
          // ignore
        }
      }
    }
  };
}

export function AnimatedAccessory({ children, fallbackPart }: AnimatedAccessoryProps) {
  const store = useAnimationStore();
  const localRef = useRef<SVGElement | null>(null);

  useLayoutEffect(() => {
    if (!store) {
      return;
    }
    const svgElement = localRef.current;
    if (!svgElement) {
      return;
    }

    const registrations: Array<() => void> = [];
    const targets = svgElement.querySelectorAll<SVGGraphicsElement>("g[transform]");

    targets.forEach((target) => {
      const part = matchPartByTransform(target.getAttribute("transform"));
      if (!part) {
        return;
      }
      const baseTransform = target.getAttribute("transform") ?? "";
      registrations.push(
        store.register(part, {
          getBaseTransform: () => baseTransform,
          setTransform: (value) => target.setAttribute("transform", value),
        })
      );
    });

    if (!registrations.length && fallbackPart) {
      const baseTransform = svgElement.getAttribute("transform") ?? "";
      registrations.push(
        store.register(fallbackPart, {
          getBaseTransform: () => baseTransform,
          setTransform: (value) => svgElement.setAttribute("transform", value),
        })
      );
    }

    return () => {
      registrations.forEach((cleanup) => cleanup());
    };
  }, [store, fallbackPart]);

  if (!isValidElement(children)) {
    return children;
  }

  return cloneElement(children as ReactElement<any>, {
    ref: mergeRefs((children as any).ref, localRef),
  } as any);
}
