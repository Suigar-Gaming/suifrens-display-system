import type { AnimationPart } from "./parts.js";

type Options = {
  pivotOverride?: { x: number; y: number };
};

export function useAnimatedPartTransform(
  part: AnimationPart,
  baseTransform: string,
  options?: Options
) {
  void part;
  void options;
  return baseTransform;
}
