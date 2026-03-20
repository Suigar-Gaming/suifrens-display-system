import { type ReactNode } from "react";
import { AnimationStore } from "./AnimationStore.js";
import { AnimationController } from "./AnimationController.js";
import type { AnimationConfig } from "./types.js";
type AnimationProviderProps = {
    animation?: AnimationConfig | null;
    children: ReactNode;
};
export declare function AnimationProvider({ animation, children }: AnimationProviderProps): import("react/jsx-runtime").JSX.Element;
export declare function useAnimationStore(): AnimationStore | null;
export declare function useAnimationController(): AnimationController | null;
export {};
