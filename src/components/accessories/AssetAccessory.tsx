import { AnimatedAccessory } from "../../animation/AnimatedAccessory.js";
import type { AnimationPart } from "../../animation/parts.js";
import type { AccessoryMetadata } from "../../utils/accessoryUtils.js";
import { getVipCrownAssetSrc } from "./crownAssets.js";
import { SvgAccessory } from "./SvgAccessory.js";
import type {
  AccessoryRendererProps,
  BodyAccessoryProps,
} from "./AccessorySlot.js";
import {
  ACCESSORY_ASSET_MANIFEST,
  type AccessoryAssetVariant,
} from "../../generated/accessoryAssetManifest.js";

const TYPE_FALLBACK: Partial<Record<string, AnimationPart>> = {
  head: "head",
  eyes: "head",
  body: "body",
  torso: "body",
  back: "body",
  object: "leftArm",
};

const NAME_SPECIFIC_FALLBACK: Partial<Record<string, AnimationPart>> = {
  wings: "body",
  "superhero cape": "body",
};

function resolveFallbackPart(
  accessory: Pick<AccessoryMetadata, "name" | "type">
): AnimationPart | undefined {
  const { name, type } = accessory;
  return NAME_SPECIFIC_FALLBACK[name] ?? TYPE_FALLBACK[type];
}

function resolveVariant(props: BodyAccessoryProps): AccessoryAssetVariant {
  if (props.body) {
    return "body";
  }
  return props.lor ?? "default";
}

function resolveAssetSrc(props: AccessoryRendererProps) {
  const explicitAsset =
    props.accessory.renderOptions.assetSrc ??
    (props.accessory.category === "crowns"
      ? getVipCrownAssetSrc(props.accessory.name)
      : undefined);
  if (explicitAsset) {
    return explicitAsset;
  }

  const variants =
    ACCESSORY_ASSET_MANIFEST[
      props.accessory.name as keyof typeof ACCESSORY_ASSET_MANIFEST
    ];
  return variants?.[resolveVariant(props)] ?? variants?.default;
}

export function AssetAccessory(props: AccessoryRendererProps) {
  const assetSrc = resolveAssetSrc(props);
  if (!assetSrc) {
    return null;
  }

  const fallbackPart =
    props.accessory.renderOptions.animationPart ??
    resolveFallbackPart(props.accessory);

  return (
    <AnimatedAccessory fallbackPart={fallbackPart}>
      <SvgAccessory
        assetSrc={assetSrc}
        species={props.species}
        placement={props.accessory.renderOptions.placement}
      />
    </AnimatedAccessory>
  );
}
