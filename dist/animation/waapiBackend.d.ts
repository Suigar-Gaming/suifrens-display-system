import { type AnimationStore } from "./AnimationStore.js";
import type { AnimationConfig } from "./types.js";
type BackendPreference = "auto" | "waapi" | "fallback";
declare global {
    var __SUIFREN_ANIMATION_BACKEND__: BackendPreference | undefined;
}
type WaapiStartResult = {
    handled: true;
    cleanup: () => void;
} | {
    handled: false;
};
export declare function startWaapiAnimation(store: AnimationStore, config: AnimationConfig | null): WaapiStartResult;
export {};
