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

export function getAccessoriesByType(accessories: AccessoryMetadata[]) {
  return accessories.reduce<Record<string, AccessoryMetadata>>(
    (accumulator, accessory) => {
      accumulator[accessory.type] = accessory;
      return accumulator;
    },
    {}
  );
}
