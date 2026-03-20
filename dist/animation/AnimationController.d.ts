import { AnimationStore } from "./AnimationStore.js";
import type { AnimationConfig } from "./types.js";
export declare class AnimationController {
    private readonly store;
    private readonly player;
    private sequenceSource;
    private playbackSignature;
    private currentDirection;
    private currentPlayState;
    private lastTrigger;
    private holdOnComplete;
    private transitionFrom;
    private transitionStartedAt;
    private transitionDurationMs;
    private lastPoses;
    constructor(store: AnimationStore);
    applyConfig(config: AnimationConfig | null): void;
    stop(): void;
    update(deltaMs: number): void;
    private resolveSequence;
    private resolvePlayState;
    private syncCurrentPoses;
}
