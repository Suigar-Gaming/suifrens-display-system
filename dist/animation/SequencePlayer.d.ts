import type { AnimationPart } from "./parts.js";
import type { AnimationSequence, PartPose, PlaybackOptions } from "./types.js";
export declare class SequencePlayer {
    private sequence;
    private playback;
    private time;
    private direction;
    private completedIterations;
    private playing;
    private currentPoses;
    load(sequence: AnimationSequence, playback?: PlaybackOptions, options?: {
        direction?: 1 | -1;
        startAt?: "start" | "end";
    }): void;
    play(): void;
    pause(): void;
    stop(resetTime?: boolean): void;
    isPlaying(): boolean;
    hasSequence(): boolean;
    setPlayback(playback?: PlaybackOptions): void;
    setDirection(direction: 1 | -1, resetTime?: boolean, position?: "start" | "end"): void;
    restart(position?: "start" | "end"): void;
    getDuration(): number;
    getTime(): number;
    setTime(time: number): void;
    hasActivePose(): boolean;
    update(deltaMs: number): boolean;
    getCurrentPoses(): Map<AnimationPart, PartPose>;
    private handleIterationEnd;
    private recalculate;
}
