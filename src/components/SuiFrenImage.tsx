import { ReactNode, useMemo } from "react";
import { AnimationProvider } from "../animation/AnimationContext.js";
import type {
  AnimationConfig,
  AnimationSequence,
  AnimationDirection,
  PlaybackOptions,
  PlayState,
} from "../animation/types.js";
import { BullsharkImage } from "./bullshark-image/BullsharkImage.js";
import { SuiFrenAttributes } from "./types.js";
import { AccessoryMetadata } from "../utils/accessoryUtils.js";
import { assertUnreachable } from "../utils/assertUnreachable.js";
import { CapyImage } from "./capy-image/CapyImage.js";
import { getAccessoriesByType } from "../utils/accessoryUtils.js";

type SuiFrenImageProps = {
  attributes: SuiFrenAttributes;
  accessories?: AccessoryMetadata[];
  incognito?: boolean;
  shadow?: boolean;
  logo?: ReactNode;
  animation?: AnimationConfig | null;
  animationPreset?: string;
  animationSequence?: AnimationSequence;
  animationPlayback?: PlaybackOptions;
  animationPlayState?: PlayState;
  animationDirection?: AnimationDirection;
  animationTrigger?: string | number;
  animationStartAt?: "start" | "end";
  animationAutoPlay?: boolean;
  animationHoldOnComplete?: boolean;
};

export function SuiFrenImage({
  attributes,
  accessories,
  incognito = false,
  shadow = false,
  logo,
  animation: animationProp,
  animationPreset,
  animationSequence,
  animationPlayback,
  animationPlayState,
  animationDirection,
  animationTrigger,
  animationStartAt,
  animationAutoPlay,
  animationHoldOnComplete,
}: SuiFrenImageProps) {
  const accessoriesByType = accessories
    ? getAccessoriesByType(accessories)
    : undefined;

  let suiFrenImageContent: ReactNode | undefined;
  if ("finStyle" in attributes) {
    suiFrenImageContent = (
      <BullsharkImage
        accessoriesByType={accessoriesByType}
        attributes={attributes}
        incognito={incognito}
      />
    );
  } else if ("earShape" in attributes) {
    suiFrenImageContent = (
      <CapyImage
        accessoriesByType={accessoriesByType}
        attributes={attributes}
        incognito={incognito}
      />
    );
  } else {
    assertUnreachable(attributes);
  }

  const resolvedAnimation = useMemo<AnimationConfig | null>(() => {
    if (animationProp !== undefined) {
      return animationProp ?? null;
    }

    const sourceSequence = animationSequence;
    const sourcePreset = animationPreset;

    if (!sourceSequence && !sourcePreset) {
      return null;
    }

    const base: AnimationConfig = sourceSequence
      ? { sequence: sourceSequence }
      : { preset: sourcePreset! };

    if (animationPlayback) {
      base.playback = animationPlayback;
    }
    if (animationPlayState) {
      base.playState = animationPlayState;
    }
    if (animationDirection) {
      base.direction = animationDirection;
    }
    if (animationTrigger !== undefined) {
      base.trigger = animationTrigger;
    }
    if (animationStartAt) {
      base.startAt = animationStartAt;
    }
    if (animationAutoPlay !== undefined) {
      base.autoPlay = animationAutoPlay;
    }
    if (animationHoldOnComplete !== undefined) {
      base.holdOnComplete = animationHoldOnComplete;
    }

    return base;
  }, [
    animationProp,
    animationSequence,
    animationPreset,
    animationPlayback,
    animationPlayState,
    animationDirection,
    animationTrigger,
    animationStartAt,
    animationAutoPlay,
    animationHoldOnComplete,
  ]);

  return (
    <svg
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      x="0px"
      y="0px"
      viewBox="0 0 3000 3000"
      className="suifren-image"
    >
      {shadow ? (
        <ellipse opacity={0.3} cx="1400.4" cy="2615.2" rx="472.8" ry="130.6" />
      ) : null}
      {resolvedAnimation ? (
        <AnimationProvider animation={resolvedAnimation}>
          {suiFrenImageContent}
        </AnimationProvider>
      ) : (
        suiFrenImageContent
      )}
      {logo}
    </svg>
  );
}
