import type { AnimationPart } from "./parts.js";

export type PartPose = {
  rotate?: number;
  translate?: { x: number; y: number };
};

export type EasingName = "linear" | "easeIn" | "easeOut" | "easeInOut";

export type AnimationKeyframe = {
  at: number;
  pose: PartPose;
  ease?: EasingName;
};

export type AnimationTrack = {
  part: AnimationPart;
  keyframes: AnimationKeyframe[];
};

export type AnimationSequence = {
  name?: string;
  duration: number;
  tracks: AnimationTrack[];
};

export type PlaybackOptions = {
  /**
   * Number of directional passes to execute. Defaults to 1.
   * Use "infinite" to repeat forever.
   */
  iterations?: number | "infinite";
  /**
   * Mirrors the sequence on every other iteration (forward then backward).
   */
  alternate?: boolean;
  /**
   * Speed multiplier, where 1 is the authored speed.
   */
  speed?: number;
  /**
   * Convenience alias for iterations. `true` means infinite loop.
   */
  loop?: boolean | number;
};

export type AnimationConfig =
  | {
      sequence: AnimationSequence;
      playback?: PlaybackOptions;
      autoPlay?: boolean;
    }
  | {
      preset: string;
      playback?: PlaybackOptions;
      autoPlay?: boolean;
    };
