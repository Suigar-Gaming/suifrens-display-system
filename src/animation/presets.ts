import type { AnimationSequence } from "./types.js";

const WALK_DURATION = 1200;

const walkSequence: AnimationSequence = {
  name: "walk",
  duration: WALK_DURATION,
  tracks: [
    {
      part: "leftArm",
      keyframes: [
        { at: 0, pose: { rotate: 18 }, ease: "easeInOut" },
        { at: WALK_DURATION / 2, pose: { rotate: -18 }, ease: "easeInOut" },
        { at: WALK_DURATION, pose: { rotate: 18 }, ease: "easeInOut" },
      ],
    },
    {
      part: "rightArm",
      keyframes: [
        { at: 0, pose: { rotate: -18 }, ease: "easeInOut" },
        { at: WALK_DURATION / 2, pose: { rotate: 18 }, ease: "easeInOut" },
        { at: WALK_DURATION, pose: { rotate: -18 }, ease: "easeInOut" },
      ],
    },
    {
      part: "leftLeg",
      keyframes: [
        { at: 0, pose: { rotate: -12 }, ease: "easeInOut" },
        { at: WALK_DURATION / 2, pose: { rotate: 12 }, ease: "easeInOut" },
        { at: WALK_DURATION, pose: { rotate: -12 }, ease: "easeInOut" },
      ],
    },
    {
      part: "rightLeg",
      keyframes: [
        { at: 0, pose: { rotate: 12 }, ease: "easeInOut" },
        { at: WALK_DURATION / 2, pose: { rotate: -12 }, ease: "easeInOut" },
        { at: WALK_DURATION, pose: { rotate: 12 }, ease: "easeInOut" },
      ],
    },
    {
      part: "tail",
      keyframes: [
        { at: 0, pose: { rotate: 4 }, ease: "easeInOut" },
        { at: WALK_DURATION / 2, pose: { rotate: -4 }, ease: "easeInOut" },
        { at: WALK_DURATION, pose: { rotate: 4 }, ease: "easeInOut" },
      ],
    },
    {
      part: "fin",
      keyframes: [
        { at: 0, pose: { rotate: -3 }, ease: "easeInOut" },
        { at: WALK_DURATION / 2, pose: { rotate: 3 }, ease: "easeInOut" },
        { at: WALK_DURATION, pose: { rotate: -3 }, ease: "easeInOut" },
      ],
    },
    {
      part: "head",
      keyframes: [
        { at: 0, pose: { rotate: 2 }, ease: "easeInOut" },
        { at: WALK_DURATION / 2, pose: { rotate: -2 }, ease: "easeInOut" },
        { at: WALK_DURATION, pose: { rotate: 2 }, ease: "easeInOut" },
      ],
    },
    {
      part: "body",
      keyframes: [
        { at: 0, pose: { rotate: -1 }, ease: "easeInOut" },
        { at: WALK_DURATION / 2, pose: { rotate: 1 }, ease: "easeInOut" },
        { at: WALK_DURATION, pose: { rotate: -1 }, ease: "easeInOut" },
      ],
    },
  ],
};

const PRESETS: Record<string, AnimationSequence> = {
  walk: walkSequence,
};

export function getPresetSequence(name: string): AnimationSequence | undefined {
  return PRESETS[name];
}
