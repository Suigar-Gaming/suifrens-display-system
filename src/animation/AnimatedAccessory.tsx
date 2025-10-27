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

const REACT_FORWARD_REF_TYPE = Symbol.for("react.forward_ref");
const REACT_MEMO_TYPE = Symbol.for("react.memo");

function canAttachRefToType(type: unknown): boolean {
  if (!type) {
    return false;
  }
  if (typeof type === "string") {
    return true;
  }
  if (typeof type === "function") {
    return Boolean((type as any).prototype?.isReactComponent);
  }
  if (typeof type === "object") {
    const $$typeof = (type as { $$typeof?: symbol }).$$typeof;
    if ($$typeof === REACT_FORWARD_REF_TYPE) {
      return true;
    }
    if ($$typeof === REACT_MEMO_TYPE) {
      return canAttachRefToType((type as { type?: unknown }).type);
    }
  }
  return false;
}

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

  if (canAttachRefToType((children as ReactElement).type)) {
    return cloneElement(children as ReactElement<any>, {
      ref: mergeRefs((children as any).ref, localRef),
    } as any);
  }

  return <g ref={localRef as MutableRefObject<SVGGElement | null>}>{children}</g>;
}
