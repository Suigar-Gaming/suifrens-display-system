import { type Meta, type StoryObj } from "@storybook/react";
import { SuiFrenImage } from "./SuiFrenImage.js";
import { accessories } from "../constants/accessories.js";
import type { AnimationConfig, PlayState } from "../animation/types.js";
import { type ComponentProps, useState } from "react";
import { SuiLogo } from "./logos/SuiLogo.js";
import {
  BullsharkAttributes,
  BullsharkExpression,
} from "./bullshark-image/types.js";

const allPossibleExpressions: BullsharkExpression[] = [
  "angry",
  "annoyed",
  "bigSmile",
  "blush",
  "cool",
  "crying",
  "happy",
  "heartEyes",
  "kiss",
  "laughing",
  "mischievous",
  "relaxed",
  "sad",
  "shocked",
  "sleepy",
  "tongueOut",
  "wink",
  "dizzyFace",
  "goofy",
  "grimace",
  "ourah",
  "showing",
];

const meta = {
  title: "SuiFrenImage/Bullshark",
  component: SuiFrenImage,
  tags: ["autodocs"],
} satisfies Meta<typeof SuiFrenImage>;

export default meta;

type Story = StoryObj<typeof SuiFrenImage>;

type StoryPropsWithAllExpressions = Omit<
  ComponentProps<typeof SuiFrenImage>,
  "suiFrenType" | "attributes"
> & {
  attributes: Omit<BullsharkAttributes, "expression">;
};
type StoryWithAllExpressions = StoryObj<StoryPropsWithAllExpressions>;

export const Basic: StoryWithAllExpressions = {
  render: ({ attributes, ...props }) => (
    <div className="flex gap-2 flex-wrap">
      {allPossibleExpressions.map((expression) => (
        <div className="h-60 w-60 shrink-0" key={expression}>
          <SuiFrenImage
            attributes={{
              ...attributes,
              expression,
            }}
            {...props}
          />
        </div>
      ))}
    </div>
  ),
  args: {
    attributes: {
      mainColor: "6FBBEE",
      secondaryColor: "E6FBFF",
      skin: "basic",
      finStyle: "classic",
    },
  },
};

export const Cheetah: StoryWithAllExpressions = {
  ...Basic,
  args: {
    attributes: {
      mainColor: "FB825C",
      secondaryColor: "FFF1D6",
      skin: "cheetah",
      finStyle: "classic",
    },
  },
};

export const Fox: StoryWithAllExpressions = {
  ...Basic,
  args: {
    attributes: {
      mainColor: "DA8E2F",
      secondaryColor: "FCCD31",
      skin: "fox",
      finStyle: "classic",
    },
  },
};

export const Panda: StoryWithAllExpressions = {
  ...Basic,
  args: {
    attributes: {
      mainColor: "707070",
      secondaryColor: "FCCD31",
      skin: "panda",
      finStyle: "classic",
    },
  },
};

export const Stripes: StoryWithAllExpressions = {
  ...Basic,
  args: {
    attributes: {
      mainColor: "FFF1D6",
      secondaryColor: "707070",
      skin: "stripes",
      finStyle: "classic",
    },
  },
};

export const Dalmation: StoryWithAllExpressions = {
  ...Basic,
  args: {
    attributes: {
      mainColor: "FFF1D6",
      secondaryColor: "EAB244",
      skin: "dalmation",
      finStyle: "classic",
    },
  },
};

export const Lizard: StoryWithAllExpressions = {
  ...Basic,
  args: {
    attributes: {
      mainColor: "E991AB",
      secondaryColor: "FF5C00",
      skin: "lizard",
      finStyle: "classic",
    },
  },
};

export const Snake: StoryWithAllExpressions = {
  ...Basic,
  args: {
    attributes: {
      mainColor: "066011",
      secondaryColor: "469DFD",
      skin: "snake",
      finStyle: "classic",
    },
  },
};

export const WithShadow: Story = {
  decorators: [
    (Story) => (
      <div className="h-60 w-60">
        <Story />
      </div>
    ),
  ],
  args: {
    attributes: {
      mainColor: "6FBBEE",
      secondaryColor: "E6FBFF",
      skin: "basic",
      finStyle: "classic",
      expression: "grimace",
    },
    shadow: true,
  },
};

export const WithLogo: Story = {
  ...WithShadow,
  args: {
    attributes: {
      mainColor: "6FBBEE",
      secondaryColor: "E6FBFF",
      skin: "basic",
      finStyle: "classic",
      expression: "bigSmile",
    },
    logo: <SuiLogo />,
  },
};

export const Incognito: Story = {
  ...WithShadow,
  args: {
    attributes: {
      mainColor: "FFFFFF",
      secondaryColor: "FFFFFF",
      skin: "basic",
      finStyle: "classic",
      expression: "happy",
    },
    incognito: true,
  },
};

export const Walking: Story = {
  args: {
    attributes: {
      mainColor: "FB825C",
      secondaryColor: "FFF1D6",
      skin: "basic",
      finStyle: "classic",
      expression: "happy",
    },
    shadow: true,
    animation: {
      preset: "walk",
      playback: { iterations: "infinite", alternate: true },
    },
  },
};

const baseAnimationPresets = [
  { label: "Walk", preset: "walk" },
  { label: "Jump", preset: "jump" },
  { label: "Sit", preset: "sit" },
  { label: "Stand", preset: "stand" },
  { label: "Idle", preset: "idle" },
] as const;

const bullsharkCasinoPresets: Array<{ label: string; config: AnimationConfig }> = [
  {
    label: "Celebrate",
    config: { preset: "celebrate", playback: { iterations: "infinite", alternate: true } },
  },
  {
    label: "Jackpot",
    config: { preset: "jackpot", playback: { iterations: "infinite" } },
  },
  {
    label: "Slot Pull",
    config: { preset: "slotPull", playback: { iterations: "infinite" } },
  },
  {
    label: "Suspense",
    config: { preset: "suspense", playback: { iterations: "infinite" } },
  },
];

export const CasinoAnimations: Story = {
  render: (props) => (
    <div className="flex gap-4 flex-wrap">
      {bullsharkCasinoPresets.map(({ label, config }) => (
        <div className="flex flex-col items-center gap-2" key={label}>
          <div className="h-60 w-60 shrink-0">
            <SuiFrenImage {...props} animation={config} />
          </div>
          <span className="text-sm font-medium text-center">{label}</span>
        </div>
      ))}
    </div>
  ),
  args: {
    attributes: {
      mainColor: "6FBBEE",
      secondaryColor: "E6FBFF",
      skin: "basic",
      finStyle: "classic",
      expression: "happy",
    },
    shadow: true,
  },
};

export const BaseAnimations: Story = {
  render: (props) => (
    <div className="flex gap-4 flex-wrap">
      {baseAnimationPresets.map(({ label, preset }) => (
        <div className="flex flex-col items-center gap-2" key={preset}>
          <div className="h-60 w-60 shrink-0">
            <SuiFrenImage
              {...props}
              animationPreset={preset}
              animationPlayback={{ iterations: "infinite" }}
            />
          </div>
          <span className="text-sm font-medium text-center">{label}</span>
        </div>
      ))}
    </div>
  ),
  args: {
    attributes: {
      mainColor: "6FBBEE",
      secondaryColor: "E6FBFF",
      skin: "basic",
      finStyle: "classic",
      expression: "happy",
    },
    shadow: true,
  },
};

export const WalkJumpSit: Story = {
  args: {
    attributes: {
      mainColor: "FB825C",
      secondaryColor: "FFF1D6",
      skin: "basic",
      finStyle: "classic",
      expression: "happy",
    },
    shadow: true,
    animationPreset: "walkJumpSit",
    animationPlayback: { iterations: 1 },
    animationHoldOnComplete: true,
  },
};

export const ControlledAnimation: Story = {
  render: (props) => {
    const [playState, setPlayState] = useState<PlayState>("idle");
    const [trigger, setTrigger] = useState(0);
    const [loopMode, setLoopMode] = useState<"once" | "loop">("once");

    const playback =
      loopMode === "loop"
        ? { iterations: "infinite" as const }
        : { iterations: 1 as const };

    const runOnce = () => {
      setLoopMode("once");
      setTrigger((value) => value + 1);
      setPlayState("running");
    };

    const runLoop = () => {
      setLoopMode("loop");
      setTrigger((value) => value + 1);
      setPlayState("running");
    };

    const pause = () => setPlayState("paused");
    const stop = () => setPlayState("idle");

    return (
      <div className="flex flex-col gap-4">
        <div className="flex gap-2 flex-wrap">
          <button className="px-3 py-1 border rounded" onClick={runOnce} type="button">
            Play Celebrate Once
          </button>
          <button className="px-3 py-1 border rounded" onClick={runLoop} type="button">
            Loop Celebrate
          </button>
          <button className="px-3 py-1 border rounded" onClick={pause} type="button">
            Pause
          </button>
          <button className="px-3 py-1 border rounded" onClick={stop} type="button">
            Stop
          </button>
        </div>
        <div className="h-60 w-60 shrink-0">
          <SuiFrenImage
            {...props}
            animationPreset="celebrate"
            animationPlayback={playback}
            animationPlayState={playState}
            animationTrigger={trigger}
            animationHoldOnComplete={loopMode !== "loop"}
          />
        </div>
      </div>
    );
  },
  args: {
    attributes: {
      mainColor: "6FBBEE",
      secondaryColor: "E6FBFF",
      skin: "basic",
      finStyle: "classic",
      expression: "happy",
    },
    shadow: true,
  },
};

export const WithAccessories: Story = {
  render: (props) => (
    <div className="flex gap-2 flex-wrap">
      {accessories.map((accessory) => (
        <div className="h-60 w-60 shrink-0" key={accessory.name}>
          <SuiFrenImage {...props} accessories={[accessory]} />
        </div>
      ))}
    </div>
  ),
  args: {
    attributes: {
      mainColor: "6FBBEE",
      secondaryColor: "E6FBFF",
      skin: "basic",
      expression: "blush",
      finStyle: "classic",
    },
  },
};
