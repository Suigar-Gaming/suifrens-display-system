import type { AnimationSequence } from "./types.js";
export declare function resolvePresetSequenceSync(name: string): AnimationSequence | undefined;
export declare function isDeferredPreset(name: string): boolean;
export declare function loadDeferredPresetSequence(name: string): Promise<AnimationSequence | null>;
