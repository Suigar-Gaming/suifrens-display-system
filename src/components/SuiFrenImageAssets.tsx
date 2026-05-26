import { CSSProperties, ReactNode, useMemo } from "react";
import { AnimationProvider } from "../animation/AnimationContext.js";
import type {
  AnimationConfig,
  AnimationDirection,
  AnimationSequence,
  PlaybackOptions,
  PlayState,
} from "../animation/types.js";
import {
  AccessoryMetadata,
  getAccessoriesByType,
} from "../utils/accessoryUtils.js";
import { assertUnreachable } from "../utils/assertUnreachable.js";
import { AccessoryRendererProvider } from "./accessories/AccessorySlot.js";
import { AssetAccessory } from "./accessories/AssetAccessory.js";
import { BullsharkImage } from "./bullshark-image/BullsharkImage.js";
import { CapyImage } from "./capy-image/CapyImage.js";
import { SuiFrenAttributes } from "./types.js";
import type { SuiFrenRenderSize } from "./SuiFrenImage.js";

export type SuiFrenImageAssetsProps = {
  attributes: SuiFrenAttributes;
  accessories?: AccessoryMetadata[];
  detail?: "full" | "head";
  renderSize?: SuiFrenRenderSize;
  incognito?: boolean;
  shadow?: boolean;
  logo?: ReactNode;
  className?: string;
  style?: CSSProperties;
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

export function SuiFrenImageAssets({
  attributes,
  accessories,
  detail = "full",
  renderSize,
  incognito = false,
  shadow = false,
  logo,
  className,
  style,
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
}: SuiFrenImageAssetsProps) {
  const accessoriesByType = accessories
    ? getAccessoriesByType(accessories)
    : undefined;

  let suiFrenImageContent: ReactNode | undefined;
  if ("finStyle" in attributes) {
    suiFrenImageContent = (
      <BullsharkImage
        accessoriesByType={accessoriesByType}
        attributes={attributes}
        detail={detail}
        incognito={incognito}
      />
    );
  } else if ("earShape" in attributes) {
    suiFrenImageContent = (
      <CapyImage
        accessoriesByType={accessoriesByType}
        attributes={attributes}
        detail={detail}
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

  const resolvedSize =
    typeof renderSize === "number"
      ? { width: renderSize, height: renderSize }
      : renderSize;
  const renderedContent = (
    <AccessoryRendererProvider renderer={AssetAccessory}>
      {suiFrenImageContent}
    </AccessoryRendererProvider>
  );

  return (
    <svg
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      x="0px"
      y="0px"
      width={resolvedSize?.width}
      height={resolvedSize?.height}
      viewBox="0 -200 3000 3000"
      className={["suifren-image", className].filter(Boolean).join(" ")}
      style={style}
    >
      {shadow ? (
        <ellipse opacity={0.3} cx="1400.4" cy="2615.2" rx="472.8" ry="130.6" />
      ) : null}
      {resolvedAnimation ? (
        <AnimationProvider animation={resolvedAnimation}>
          {renderedContent}
        </AnimationProvider>
      ) : (
        renderedContent
      )}
      {logo}
    </svg>
  );
}
