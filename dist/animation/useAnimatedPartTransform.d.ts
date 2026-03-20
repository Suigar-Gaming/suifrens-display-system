import type { AnimationPart } from "./parts.js";
type Options = {
    pivotOverride?: {
        x: number;
        y: number;
    };
};
export declare function useAnimatedPartTransform(part: AnimationPart, baseTransform: string, options?: Options): string;
export {};
