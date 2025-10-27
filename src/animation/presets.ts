import type { AnimationSequence, AnimationKeyframe } from "./types.js";
import type { AnimationPart } from "./parts.js";

const WALK_DURATION = 1200;

const walkSequence: AnimationSequence = {
  name: "walk",
  duration: WALK_DURATION,
  tracks: [
    {
      part: "leftArm",
      keyframes: [
        { at: 0, pose: { rotate: 12 }, ease: "easeInOut" },
        { at: WALK_DURATION / 2, pose: { rotate: -12 }, ease: "easeInOut" },
        { at: WALK_DURATION, pose: { rotate: 12 }, ease: "easeInOut" },
      ],
    },
    {
      part: "rightArm",
      keyframes: [
        { at: 0, pose: { rotate: -12 }, ease: "easeInOut" },
        { at: WALK_DURATION / 2, pose: { rotate: 12 }, ease: "easeInOut" },
        { at: WALK_DURATION, pose: { rotate: -12 }, ease: "easeInOut" },
      ],
    },
    {
      part: "leftLeg",
      keyframes: [
        { at: 0, pose: { rotate: -8 }, ease: "easeInOut" },
        { at: WALK_DURATION / 2, pose: { rotate: 8 }, ease: "easeInOut" },
        { at: WALK_DURATION, pose: { rotate: -8 }, ease: "easeInOut" },
      ],
    },
    {
      part: "rightLeg",
      keyframes: [
        { at: 0, pose: { rotate: 8 }, ease: "easeInOut" },
        { at: WALK_DURATION / 2, pose: { rotate: -8 }, ease: "easeInOut" },
        { at: WALK_DURATION, pose: { rotate: 8 }, ease: "easeInOut" },
      ],
    },
    {
      part: "tail",
      keyframes: [
        { at: 0, pose: { rotate: 2 }, ease: "easeInOut" },
        { at: WALK_DURATION / 2, pose: { rotate: -2 }, ease: "easeInOut" },
        { at: WALK_DURATION, pose: { rotate: 2 }, ease: "easeInOut" },
      ],
    },
    {
      part: "fin",
      keyframes: [
        { at: 0, pose: { rotate: -1.5 }, ease: "easeInOut" },
        { at: WALK_DURATION / 2, pose: { rotate: 1.5 }, ease: "easeInOut" },
        { at: WALK_DURATION, pose: { rotate: -1.5 }, ease: "easeInOut" },
      ],
    },
    {
      part: "head",
      keyframes: [
        { at: 0, pose: { rotate: 1 }, ease: "easeInOut" },
        { at: WALK_DURATION / 2, pose: { rotate: -1 }, ease: "easeInOut" },
        { at: WALK_DURATION, pose: { rotate: 1 }, ease: "easeInOut" },
      ],
    },
    {
      part: "body",
      keyframes: [
        { at: 0, pose: { rotate: -0.6 }, ease: "easeInOut" },
        { at: WALK_DURATION / 2, pose: { rotate: 0.6 }, ease: "easeInOut" },
        { at: WALK_DURATION, pose: { rotate: -0.6 }, ease: "easeInOut" },
      ],
    },
  ],
};

const CELEBRATE_DURATION = 900;

const celebrateSequence: AnimationSequence = {
  name: "celebrate",
  duration: CELEBRATE_DURATION,
  tracks: [
    {
      part: "leftArm",
      keyframes: [
        { at: 0, pose: { rotate: 6 }, ease: "easeOut" },
        { at: CELEBRATE_DURATION * 0.25, pose: { rotate: -30 }, ease: "easeInOut" },
        { at: CELEBRATE_DURATION * 0.55, pose: { rotate: -16 }, ease: "easeInOut" },
        { at: CELEBRATE_DURATION * 0.75, pose: { rotate: -32 }, ease: "easeInOut" },
        { at: CELEBRATE_DURATION, pose: { rotate: 6 }, ease: "easeIn" },
      ],
    },
    {
      part: "rightArm",
      keyframes: [
        { at: 0, pose: { rotate: -6 }, ease: "easeOut" },
        { at: CELEBRATE_DURATION * 0.25, pose: { rotate: 30 }, ease: "easeInOut" },
        { at: CELEBRATE_DURATION * 0.55, pose: { rotate: 16 }, ease: "easeInOut" },
        { at: CELEBRATE_DURATION * 0.75, pose: { rotate: 32 }, ease: "easeInOut" },
        { at: CELEBRATE_DURATION, pose: { rotate: -6 }, ease: "easeIn" },
      ],
    },
    {
      part: "body",
      keyframes: [
        { at: 0, pose: { translate: { x: 0, y: 0 } }, ease: "easeOut" },
        { at: CELEBRATE_DURATION * 0.2, pose: { translate: { x: 0, y: -18 } }, ease: "easeInOut" },
        { at: CELEBRATE_DURATION * 0.55, pose: { translate: { x: 0, y: -6 } }, ease: "easeInOut" },
        { at: CELEBRATE_DURATION * 0.8, pose: { translate: { x: 0, y: -20 } }, ease: "easeInOut" },
        { at: CELEBRATE_DURATION, pose: { translate: { x: 0, y: 0 } }, ease: "easeIn" },
      ],
    },
    {
      part: "head",
      keyframes: [
        { at: 0, pose: { rotate: 0, translate: { x: 0, y: 0 } }, ease: "easeOut" },
        { at: CELEBRATE_DURATION * 0.25, pose: { rotate: -4, translate: { x: 0, y: -10 } }, ease: "easeInOut" },
        { at: CELEBRATE_DURATION * 0.5, pose: { rotate: 3, translate: { x: 0, y: -3 } }, ease: "easeInOut" },
        { at: CELEBRATE_DURATION * 0.75, pose: { rotate: -5, translate: { x: 0, y: -12 } }, ease: "easeInOut" },
        { at: CELEBRATE_DURATION, pose: { rotate: 0, translate: { x: 0, y: 0 } }, ease: "easeIn" },
      ],
    },
    {
      part: "leftLeg",
      keyframes: [
        { at: 0, pose: { rotate: 0 }, ease: "linear" },
        { at: CELEBRATE_DURATION * 0.25, pose: { rotate: 5 }, ease: "easeInOut" },
        { at: CELEBRATE_DURATION * 0.5, pose: { rotate: -4 }, ease: "easeInOut" },
        { at: CELEBRATE_DURATION * 0.75, pose: { rotate: 6 }, ease: "easeInOut" },
        { at: CELEBRATE_DURATION, pose: { rotate: 0 }, ease: "linear" },
      ],
    },
    {
      part: "rightLeg",
      keyframes: [
        { at: 0, pose: { rotate: 0 }, ease: "linear" },
        { at: CELEBRATE_DURATION * 0.25, pose: { rotate: -5 }, ease: "easeInOut" },
        { at: CELEBRATE_DURATION * 0.5, pose: { rotate: 4 }, ease: "easeInOut" },
        { at: CELEBRATE_DURATION * 0.75, pose: { rotate: -6 }, ease: "easeInOut" },
        { at: CELEBRATE_DURATION, pose: { rotate: 0 }, ease: "linear" },
      ],
    },
    {
      part: "tail",
      keyframes: [
        { at: 0, pose: { rotate: 0 }, ease: "easeOut" },
        { at: CELEBRATE_DURATION * 0.5, pose: { rotate: 4 }, ease: "easeInOut" },
        { at: CELEBRATE_DURATION, pose: { rotate: 0 }, ease: "easeIn" },
      ],
    },
    {
      part: "fin",
      keyframes: [
        { at: 0, pose: { rotate: 0 }, ease: "easeOut" },
        { at: CELEBRATE_DURATION * 0.5, pose: { rotate: -2.5 }, ease: "easeInOut" },
        { at: CELEBRATE_DURATION, pose: { rotate: 0 }, ease: "easeIn" },
      ],
    },
  ],
};

const JACKPOT_DURATION = 1300;

const jackpotSequence: AnimationSequence = {
  name: "jackpot",
  duration: JACKPOT_DURATION,
  tracks: [
    {
      part: "leftArm",
      keyframes: [
        { at: 0, pose: { rotate: 0 }, ease: "easeOut" },
        { at: JACKPOT_DURATION * 0.35, pose: { rotate: -35 }, ease: "easeInOut" },
        { at: JACKPOT_DURATION * 0.6, pose: { rotate: -18 }, ease: "easeInOut" },
        { at: JACKPOT_DURATION, pose: { rotate: 0 }, ease: "easeOut" },
      ],
    },
    {
      part: "rightArm",
      keyframes: [
        { at: 0, pose: { rotate: 0 }, ease: "easeOut" },
        { at: JACKPOT_DURATION * 0.35, pose: { rotate: 35 }, ease: "easeInOut" },
        { at: JACKPOT_DURATION * 0.6, pose: { rotate: 18 }, ease: "easeInOut" },
        { at: JACKPOT_DURATION, pose: { rotate: 0 }, ease: "easeOut" },
      ],
    },
    {
      part: "body",
      keyframes: [
        { at: 0, pose: { translate: { x: 0, y: 0 } }, ease: "easeOut" },
        { at: JACKPOT_DURATION * 0.2, pose: { translate: { x: 0, y: -22 } }, ease: "easeInOut" },
        { at: JACKPOT_DURATION * 0.45, pose: { translate: { x: 0, y: -6 } }, ease: "easeInOut" },
        { at: JACKPOT_DURATION * 0.75, pose: { translate: { x: 0, y: -14 } }, ease: "easeInOut" },
        { at: JACKPOT_DURATION, pose: { translate: { x: 0, y: 0 } }, ease: "easeOut" },
      ],
    },
    {
      part: "head",
      keyframes: [
        { at: 0, pose: { rotate: 0 }, ease: "easeOut" },
        { at: JACKPOT_DURATION * 0.25, pose: { rotate: -6 }, ease: "easeInOut" },
        { at: JACKPOT_DURATION * 0.55, pose: { rotate: 4 }, ease: "easeInOut" },
        { at: JACKPOT_DURATION * 0.75, pose: { rotate: -3 }, ease: "easeInOut" },
        { at: JACKPOT_DURATION, pose: { rotate: 0 }, ease: "easeOut" },
      ],
    },
    {
      part: "tail",
      keyframes: [
        { at: 0, pose: { rotate: 0 }, ease: "easeOut" },
        { at: JACKPOT_DURATION * 0.35, pose: { rotate: 6 }, ease: "easeInOut" },
        { at: JACKPOT_DURATION * 0.7, pose: { rotate: -4 }, ease: "easeInOut" },
        { at: JACKPOT_DURATION, pose: { rotate: 0 }, ease: "easeOut" },
      ],
    },
    {
      part: "leftLeg",
      keyframes: [
        { at: 0, pose: { rotate: 0 }, ease: "easeOut" },
        { at: JACKPOT_DURATION * 0.35, pose: { rotate: 7 }, ease: "easeInOut" },
        { at: JACKPOT_DURATION * 0.65, pose: { rotate: -3 }, ease: "easeInOut" },
        { at: JACKPOT_DURATION, pose: { rotate: 0 }, ease: "easeOut" },
      ],
    },
    {
      part: "rightLeg",
      keyframes: [
        { at: 0, pose: { rotate: 0 }, ease: "easeOut" },
        { at: JACKPOT_DURATION * 0.35, pose: { rotate: -7 }, ease: "easeInOut" },
        { at: JACKPOT_DURATION * 0.65, pose: { rotate: 3 }, ease: "easeInOut" },
        { at: JACKPOT_DURATION, pose: { rotate: 0 }, ease: "easeOut" },
      ],
    },
  ],
};

const SLOT_PULL_DURATION = 900;

const slotPullSequence: AnimationSequence = {
  name: "slotPull",
  duration: SLOT_PULL_DURATION,
  tracks: [
    {
      part: "rightArm",
      keyframes: [
        { at: 0, pose: { rotate: -6, translate: { x: 0, y: 0 } }, ease: "easeOut" },
        { at: SLOT_PULL_DURATION * 0.3, pose: { rotate: 45, translate: { x: -16, y: 42 } }, ease: "easeInOut" },
        { at: SLOT_PULL_DURATION * 0.6, pose: { rotate: -22, translate: { x: -6, y: 66 } }, ease: "easeInOut" },
        { at: SLOT_PULL_DURATION, pose: { rotate: -6, translate: { x: 0, y: 0 } }, ease: "easeIn" },
      ],
    },
    {
      part: "body",
      keyframes: [
        { at: 0, pose: { rotate: 0, translate: { x: 0, y: 0 } }, ease: "easeOut" },
        {
          at: SLOT_PULL_DURATION * 0.3,
          pose: { rotate: 8, translate: { x: -8, y: 10 } },
          ease: "easeInOut",
        },
        {
          at: SLOT_PULL_DURATION * 0.55,
          pose: { rotate: -4, translate: { x: -2, y: -3 } },
          ease: "easeInOut",
        },
        { at: SLOT_PULL_DURATION, pose: { rotate: 0, translate: { x: 0, y: 0 } }, ease: "easeIn" },
      ],
    },
    {
      part: "head",
      keyframes: [
        { at: 0, pose: { rotate: 0 }, ease: "easeOut" },
        { at: SLOT_PULL_DURATION * 0.3, pose: { rotate: 3 }, ease: "easeInOut" },
        { at: SLOT_PULL_DURATION * 0.6, pose: { rotate: -2 }, ease: "easeInOut" },
        { at: SLOT_PULL_DURATION, pose: { rotate: 0 }, ease: "easeIn" },
      ],
    },
    {
      part: "leftArm",
      keyframes: [
        { at: 0, pose: { rotate: 3 }, ease: "easeOut" },
        { at: SLOT_PULL_DURATION * 0.35, pose: { rotate: -3 }, ease: "easeInOut" },
        { at: SLOT_PULL_DURATION * 0.7, pose: { rotate: 0 }, ease: "easeInOut" },
        { at: SLOT_PULL_DURATION, pose: { rotate: 3 }, ease: "easeIn" },
      ],
    },
    {
      part: "tail",
      keyframes: [
        { at: 0, pose: { rotate: 0 }, ease: "easeOut" },
        { at: SLOT_PULL_DURATION * 0.4, pose: { rotate: -3 }, ease: "easeInOut" },
        { at: SLOT_PULL_DURATION, pose: { rotate: 0 }, ease: "easeIn" },
      ],
    },
  ],
};

const SUSPENSE_DURATION = 1100;

const suspenseSequence: AnimationSequence = {
  name: "suspense",
  duration: SUSPENSE_DURATION,
  tracks: [
    {
      part: "body",
      keyframes: [
        { at: 0, pose: { rotate: 0 }, ease: "linear" },
        { at: SUSPENSE_DURATION * 0.2, pose: { rotate: -2 }, ease: "easeInOut" },
        { at: SUSPENSE_DURATION * 0.4, pose: { rotate: 2 }, ease: "easeInOut" },
        { at: SUSPENSE_DURATION * 0.6, pose: { rotate: -1.5 }, ease: "easeInOut" },
        { at: SUSPENSE_DURATION * 0.8, pose: { rotate: 1.5 }, ease: "easeInOut" },
        { at: SUSPENSE_DURATION, pose: { rotate: 0 }, ease: "easeIn" },
      ],
    },
    {
      part: "head",
      keyframes: [
        { at: 0, pose: { rotate: 0, translate: { x: 0, y: 0 } }, ease: "linear" },
        { at: SUSPENSE_DURATION * 0.25, pose: { rotate: -3, translate: { x: -4, y: -3 } }, ease: "easeInOut" },
        { at: SUSPENSE_DURATION * 0.5, pose: { rotate: 3, translate: { x: 4, y: -3 } }, ease: "easeInOut" },
        { at: SUSPENSE_DURATION * 0.75, pose: { rotate: -2, translate: { x: -3, y: -2 } }, ease: "easeInOut" },
        { at: SUSPENSE_DURATION, pose: { rotate: 0, translate: { x: 0, y: 0 } }, ease: "easeIn" },
      ],
    },
    {
      part: "leftArm",
      keyframes: [
        { at: 0, pose: { rotate: 0 }, ease: "linear" },
        { at: SUSPENSE_DURATION * 0.3, pose: { rotate: -6 }, ease: "easeInOut" },
        { at: SUSPENSE_DURATION * 0.6, pose: { rotate: 3 }, ease: "easeInOut" },
        { at: SUSPENSE_DURATION, pose: { rotate: 0 }, ease: "easeIn" },
      ],
    },
    {
      part: "rightArm",
      keyframes: [
        { at: 0, pose: { rotate: 0 }, ease: "linear" },
        { at: SUSPENSE_DURATION * 0.3, pose: { rotate: 6 }, ease: "easeInOut" },
        { at: SUSPENSE_DURATION * 0.6, pose: { rotate: -3 }, ease: "easeInOut" },
        { at: SUSPENSE_DURATION, pose: { rotate: 0 }, ease: "easeIn" },
      ],
    },
    {
      part: "tail",
      keyframes: [
        { at: 0, pose: { rotate: 0 }, ease: "linear" },
        { at: SUSPENSE_DURATION * 0.3, pose: { rotate: 2.5 }, ease: "easeInOut" },
        { at: SUSPENSE_DURATION * 0.6, pose: { rotate: -2.5 }, ease: "easeInOut" },
        { at: SUSPENSE_DURATION, pose: { rotate: 0 }, ease: "easeIn" },
      ],
    },
  ],
};

const JUMP_DURATION = 900;

const jumpSequence: AnimationSequence = {
  name: "jump",
  duration: JUMP_DURATION,
  tracks: [
    {
      part: "body",
      keyframes: [
        { at: 0, pose: { translate: { x: 0, y: 0 } }, ease: "easeOut" },
        { at: JUMP_DURATION * 0.35, pose: { translate: { x: 0, y: -26 } }, ease: "easeInOut" },
        { at: JUMP_DURATION * 0.55, pose: { translate: { x: 0, y: -4 } }, ease: "easeInOut" },
        { at: JUMP_DURATION, pose: { translate: { x: 0, y: 0 } }, ease: "easeIn" },
      ],
    },
    {
      part: "head",
      keyframes: [
        { at: 0, pose: { rotate: 0 }, ease: "easeOut" },
        { at: JUMP_DURATION * 0.35, pose: { rotate: -6 }, ease: "easeInOut" },
        { at: JUMP_DURATION * 0.6, pose: { rotate: 3 }, ease: "easeInOut" },
        { at: JUMP_DURATION, pose: { rotate: 0 }, ease: "easeIn" },
      ],
    },
    {
      part: "leftArm",
      keyframes: [
        { at: 0, pose: { rotate: -5 }, ease: "easeOut" },
        { at: JUMP_DURATION * 0.3, pose: { rotate: -32 }, ease: "easeInOut" },
        { at: JUMP_DURATION * 0.6, pose: { rotate: -12 }, ease: "easeInOut" },
        { at: JUMP_DURATION, pose: { rotate: -5 }, ease: "easeIn" },
      ],
    },
    {
      part: "rightArm",
      keyframes: [
        { at: 0, pose: { rotate: 5 }, ease: "easeOut" },
        { at: JUMP_DURATION * 0.3, pose: { rotate: 32 }, ease: "easeInOut" },
        { at: JUMP_DURATION * 0.6, pose: { rotate: 12 }, ease: "easeInOut" },
        { at: JUMP_DURATION, pose: { rotate: 5 }, ease: "easeIn" },
      ],
    },
    {
      part: "leftLeg",
      keyframes: [
        { at: 0, pose: { rotate: 0 }, ease: "easeOut" },
        { at: JUMP_DURATION * 0.3, pose: { rotate: 12 }, ease: "easeInOut" },
        { at: JUMP_DURATION * 0.65, pose: { rotate: -4 }, ease: "easeInOut" },
        { at: JUMP_DURATION, pose: { rotate: 0 }, ease: "easeIn" },
      ],
    },
    {
      part: "rightLeg",
      keyframes: [
        { at: 0, pose: { rotate: 0 }, ease: "easeOut" },
        { at: JUMP_DURATION * 0.3, pose: { rotate: -12 }, ease: "easeInOut" },
        { at: JUMP_DURATION * 0.65, pose: { rotate: 4 }, ease: "easeInOut" },
        { at: JUMP_DURATION, pose: { rotate: 0 }, ease: "easeIn" },
      ],
    },
    {
      part: "tail",
      keyframes: [
        { at: 0, pose: { rotate: 0 }, ease: "easeOut" },
        { at: JUMP_DURATION * 0.4, pose: { rotate: 8 }, ease: "easeInOut" },
        { at: JUMP_DURATION, pose: { rotate: 0 }, ease: "easeIn" },
      ],
    },
  ],
};

const SIT_DURATION = 1100;

const sitSequence: AnimationSequence = {
  name: "sit",
  duration: SIT_DURATION,
  tracks: [
    {
      part: "body",
      keyframes: [
        { at: 0, pose: { translate: { x: 0, y: 0 } }, ease: "easeOut" },
        { at: SIT_DURATION * 0.6, pose: { translate: { x: 0, y: 32 } }, ease: "easeInOut" },
        { at: SIT_DURATION, pose: { translate: { x: 0, y: 34 } }, ease: "easeIn" },
      ],
    },
    {
      part: "head",
      keyframes: [
        { at: 0, pose: { rotate: 0 }, ease: "easeOut" },
        { at: SIT_DURATION * 0.5, pose: { rotate: 6 }, ease: "easeInOut" },
        { at: SIT_DURATION, pose: { rotate: 4 }, ease: "easeIn" },
      ],
    },
    {
      part: "leftLeg",
      keyframes: [
        { at: 0, pose: { rotate: 0 }, ease: "easeOut" },
        { at: SIT_DURATION * 0.3, pose: { rotate: -8 }, ease: "easeInOut" },
        { at: SIT_DURATION * 0.55, pose: { rotate: -28 }, ease: "easeInOut" },
        { at: SIT_DURATION, pose: { rotate: -30 }, ease: "easeIn" },
      ],
    },
    {
      part: "rightLeg",
      keyframes: [
        { at: 0, pose: { rotate: 0 }, ease: "easeOut" },
        { at: SIT_DURATION * 0.4, pose: { rotate: -8 }, ease: "easeInOut" },
        { at: SIT_DURATION * 0.7, pose: { rotate: -28 }, ease: "easeInOut" },
        { at: SIT_DURATION, pose: { rotate: -30 }, ease: "easeIn" },
      ],
    },
    {
      part: "leftArm",
      keyframes: [
        { at: 0, pose: { rotate: 0 }, ease: "easeOut" },
        { at: SIT_DURATION * 0.6, pose: { rotate: 10 }, ease: "easeInOut" },
        { at: SIT_DURATION, pose: { rotate: 12 }, ease: "easeIn" },
      ],
    },
    {
      part: "rightArm",
      keyframes: [
        { at: 0, pose: { rotate: 0 }, ease: "easeOut" },
        { at: SIT_DURATION * 0.6, pose: { rotate: 10 }, ease: "easeInOut" },
        { at: SIT_DURATION, pose: { rotate: 12 }, ease: "easeIn" },
      ],
    },
  ],
};

const STAND_DURATION = 1000;

const standSequence: AnimationSequence = {
  name: "standUp",
  duration: STAND_DURATION,
  tracks: [
    {
      part: "body",
      keyframes: [
        { at: 0, pose: { translate: { x: 0, y: 34 } }, ease: "easeOut" },
        { at: STAND_DURATION * 0.5, pose: { translate: { x: 0, y: 14 } }, ease: "easeInOut" },
        { at: STAND_DURATION, pose: { translate: { x: 0, y: 0 } }, ease: "easeIn" },
      ],
    },
    {
      part: "head",
      keyframes: [
        { at: 0, pose: { rotate: 4 }, ease: "easeOut" },
        { at: STAND_DURATION * 0.6, pose: { rotate: -3 }, ease: "easeInOut" },
        { at: STAND_DURATION, pose: { rotate: 0 }, ease: "easeIn" },
      ],
    },
    {
      part: "leftLeg",
      keyframes: [
        { at: 0, pose: { rotate: -30 }, ease: "easeOut" },
        { at: STAND_DURATION * 0.45, pose: { rotate: -12 }, ease: "easeInOut" },
        { at: STAND_DURATION, pose: { rotate: 0 }, ease: "easeIn" },
      ],
    },
    {
      part: "rightLeg",
      keyframes: [
        { at: 0, pose: { rotate: -30 }, ease: "easeOut" },
        { at: STAND_DURATION * 0.55, pose: { rotate: -12 }, ease: "easeInOut" },
        { at: STAND_DURATION, pose: { rotate: 0 }, ease: "easeIn" },
      ],
    },
    {
      part: "leftArm",
      keyframes: [
        { at: 0, pose: { rotate: 12 }, ease: "easeOut" },
        { at: STAND_DURATION * 0.5, pose: { rotate: 4 }, ease: "easeInOut" },
        { at: STAND_DURATION, pose: { rotate: 0 }, ease: "easeIn" },
      ],
    },
    {
      part: "rightArm",
      keyframes: [
        { at: 0, pose: { rotate: 12 }, ease: "easeOut" },
        { at: STAND_DURATION * 0.5, pose: { rotate: 4 }, ease: "easeInOut" },
        { at: STAND_DURATION, pose: { rotate: 0 }, ease: "easeIn" },
      ],
    },
  ],
};

const IDLE_DURATION = 1000;

const idleSequence: AnimationSequence = {
  name: "idle",
  duration: IDLE_DURATION,
  tracks: [
    {
      part: "body",
      keyframes: [
        { at: 0, pose: { translate: { x: 0, y: 0 } }, ease: "easeInOut" },
        { at: IDLE_DURATION * 0.5, pose: { translate: { x: 0, y: -6 } }, ease: "easeInOut" },
        { at: IDLE_DURATION, pose: { translate: { x: 0, y: 0 } }, ease: "easeInOut" },
      ],
    },
    {
      part: "head",
      keyframes: [
        { at: 0, pose: { rotate: -0.4 }, ease: "easeInOut" },
        { at: IDLE_DURATION * 0.5, pose: { rotate: 0.6 }, ease: "easeInOut" },
        { at: IDLE_DURATION, pose: { rotate: -0.4 }, ease: "easeInOut" },
      ],
    },
    {
      part: "tail",
      keyframes: [
        { at: 0, pose: { rotate: 1.5 }, ease: "easeInOut" },
        { at: IDLE_DURATION * 0.5, pose: { rotate: -1.5 }, ease: "easeInOut" },
        { at: IDLE_DURATION, pose: { rotate: 1.5 }, ease: "easeInOut" },
      ],
    },
    {
      part: "leftArm",
      keyframes: [
        { at: 0, pose: { rotate: -2 }, ease: "easeInOut" },
        { at: IDLE_DURATION * 0.5, pose: { rotate: 2 }, ease: "easeInOut" },
        { at: IDLE_DURATION, pose: { rotate: -2 }, ease: "easeInOut" },
      ],
    },
    {
      part: "rightArm",
      keyframes: [
        { at: 0, pose: { rotate: 2 }, ease: "easeInOut" },
        { at: IDLE_DURATION * 0.5, pose: { rotate: -2 }, ease: "easeInOut" },
        { at: IDLE_DURATION, pose: { rotate: 2 }, ease: "easeInOut" },
      ],
    },
  ],
};

type SequenceWithHold = {
  sequence: AnimationSequence;
  hold?: number;
};

function combineSequences(name: string, items: SequenceWithHold[]): AnimationSequence {
  const trackMap = new Map<AnimationPart, AnimationKeyframe[]>();
  let offset = 0;

  for (const { sequence, hold = 0 } of items) {
    const startOffset = offset;
    const endOffset = startOffset + sequence.duration;

    for (const track of sequence.tracks) {
      const existing = trackMap.get(track.part) ?? [];
      for (const keyframe of track.keyframes) {
        existing.push({
          at: keyframe.at + startOffset,
          pose: keyframe.pose,
          ease: keyframe.ease,
        });
      }
      trackMap.set(track.part, existing);
    }

    if (hold > 0) {
      for (const track of sequence.tracks) {
        const existing = trackMap.get(track.part);
        if (!existing || !track.keyframes.length) continue;
        const lastKeyframe = track.keyframes[track.keyframes.length - 1];
        existing.push({
          at: endOffset + hold,
          pose: lastKeyframe.pose,
          ease: lastKeyframe.ease,
        });
      }
    }

    offset = endOffset + hold;
  }

  const combinedTracks = Array.from(trackMap.entries()).map(([part, keyframes]) => ({
    part,
    keyframes,
  }));

  return {
    name,
    duration: offset,
    tracks: combinedTracks,
  };
}

const showcaseSequence = combineSequences("walkJumpSit", [
  { sequence: walkSequence },
  { sequence: jumpSequence, hold: 120 },
  { sequence: sitSequence, hold: 200 },
  { sequence: standSequence },
  { sequence: idleSequence, hold: 0 },
]);

const PRESETS: Record<string, AnimationSequence> = {
  walk: walkSequence,
  celebrate: celebrateSequence,
  jackpot: jackpotSequence,
  slotPull: slotPullSequence,
  suspense: suspenseSequence,
  jump: jumpSequence,
  sit: sitSequence,
  stand: standSequence,
  idle: idleSequence,
  walkJumpSit: showcaseSequence,
};

export function getPresetSequence(name: string): AnimationSequence | undefined {
  return PRESETS[name];
}
