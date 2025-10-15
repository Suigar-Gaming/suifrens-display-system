import { useEffect, useMemo, useRef, useState } from "react";
import type { AnimationPart } from "./parts.js";
import { useAnimationStore } from "./AnimationContext.js";

type Options = {
  pivotOverride?: { x: number; y: number };
};

export function useAnimatedPartTransform(
  part: AnimationPart,
  baseTransform: string,
  options?: Options
) {
  const store = useAnimationStore();
  const [transform, setTransform] = useState(baseTransform);
  const baseRef = useRef(baseTransform);

  useEffect(() => {
    baseRef.current = baseTransform;
    if (!store) {
      setTransform(baseTransform);
    } else {
      store.refresh(part);
    }
  }, [baseTransform, part, store]);

  useEffect(() => {
    if (!store) {
      return;
    }
    const registration = {
      getBaseTransform: () => baseRef.current,
      setTransform: (value: string) => setTransform(value),
      pivotOverride: options?.pivotOverride,
    };
    const unregister = store.register(part, registration);
    return unregister;
  }, [store, part, options?.pivotOverride]);

  return transform;
}
