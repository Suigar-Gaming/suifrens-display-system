export { SuiFrenImage } from "./components/SuiFrenImage.js";
export type { SuiFrenImageProps } from "./components/SuiFrenImage.js";

export { BullsharkImage } from "./components/bullshark-image/BullsharkImage.js";
export type { BullsharkImageProps } from "./components/bullshark-image/BullsharkImage.js";

export { CapyImage } from "./components/capy-image/CapyImage.js";
export type { CapyImageProps } from "./components/capy-image/CapyImage.js";

export type { SuiFrenAttributes, SuiFrenType } from "./components/types.js";
export type {
  BullsharkAttributes,
  BullsharkExpression,
  BullsharkFinStyle,
  BullsharkSkin,
} from "./components/bullshark-image/types.js";
export type {
  CapyAttributes,
  CapyEarShape,
  CapyExpression,
  CapySkin,
} from "./components/capy-image/types.js";

export type { AccessoryMetadata } from "./utils/accessoryUtils.js";
export { getAccessoriesByType } from "./utils/accessoryUtils.js";

export {
  AnimationProvider,
  useAnimationController,
  useAnimationStore,
} from "./animation/AnimationContext.js";
export { AnimatedAccessory } from "./animation/AnimatedAccessory.js";
export { useAnimatedPartTransform } from "./animation/useAnimatedPartTransform.js";
export type { AnimationPart } from "./animation/parts.js";
export type {
  AnimationConfig,
  AnimationDirection,
  AnimationKeyframe,
  AnimationSequence,
  AnimationTrack,
  EasingName,
  PartPose,
  PlaybackOptions,
  PlayState,
} from "./animation/types.js";
export { getPresetSequence } from "./animation/presets.js";
