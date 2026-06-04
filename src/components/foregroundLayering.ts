import type { AnimationConfig } from "../animation/types.js";
import type { AccessoryMetadata } from "../utils/accessoryUtils.js";

export function shouldRenderMicrophoneArmInForeground(
  animation: AnimationConfig | null,
  accessoriesByType?: Record<string, AccessoryMetadata>
) {
  const objectAccessory = accessoriesByType?.object;
  if (objectAccessory?.name !== "microphone" || !animation) {
    return false;
  }

  if ("preset" in animation) {
    return animation.preset === "talkMicrophone";
  }

  return animation.sequence.name === "talkMicrophone";
}
