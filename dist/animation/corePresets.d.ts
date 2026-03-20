import type { AnimationSequence } from "./types.js";
export declare const CORE_PRESET_SEQUENCES: Record<string, AnimationSequence>;
export declare function getCorePresetSequence(name: string): AnimationSequence | undefined;
