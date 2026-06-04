import type { AnimationPart } from "../animation/parts.js";

export type SuiFrenSpecies = "capy" | "bullshark";

export type AccessoryPlacement = {
  x?: number;
  y?: number;
  scale?: number;
  rotation?: number;
  originX?: number;
  originY?: number;
};

export type AccessoryRenderOptions = Record<string, unknown> & {
  showEars?: boolean;
  showFin?: boolean;
  country?: string;
  side?: "home" | "away";
  assetSrc?: string;
  placement?: Partial<Record<SuiFrenSpecies, AccessoryPlacement>>;
  animationPart?: AnimationPart;
};

export type AccessoryMetadata = {
  type: string;
  category: string;
  renderOptions: AccessoryRenderOptions;
  name: string;
  price: number;
  quantity: number | null;
  description: string;
  collection: string;
};

function getAccessorySlotKey(accessory: AccessoryMetadata) {
  if (accessory.type === "feet") {
    if (accessory.renderOptions.animationPart === "leftLeg") {
      return "leftFeet";
    }
    if (accessory.renderOptions.animationPart === "rightLeg") {
      return "rightFeet";
    }
  }

  return accessory.type;
}

export function getAccessoriesByType(accessories: AccessoryMetadata[]) {
  return accessories.reduce<Record<string, AccessoryMetadata>>(
    (accumulator, accessory) => {
      accumulator[getAccessorySlotKey(accessory)] = accessory;
      return accumulator;
    },
    {}
  );
}
