import { AnimatedAccessory } from "../../animation/AnimatedAccessory.js";
import type { AnimationPart } from "../../animation/parts.js";
import { SvgAccessory } from "./SvgAccessory.js";
import { getVipCrownAssetSrc } from "./crownAssets.js";
import { ACCESSORY_RENDERERS } from "./inlineRegistry.js";
import type {
  AccessoryMetadata,
  SuiFrenSpecies,
} from "../../utils/accessoryUtils.js";
import type {
  AccessoryRendererProps,
  BodyAccessoryProps,
} from "./AccessorySlot.js";

export type { BodyAccessoryProps } from "./AccessorySlot.js";

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
  const specific = NAME_SPECIFIC_FALLBACK[name];
  if (specific) {
    return specific;
  }
  return TYPE_FALLBACK[type];
}

function resolveAssetSrc(accessory: AccessoryMetadata) {
  return (
    accessory.renderOptions.assetSrc ??
    (accessory.category === "crowns"
      ? getVipCrownAssetSrc(accessory.name)
      : undefined)
  );
}

type AccessoryProps = AccessoryRendererProps;

export function InlineAccessory(props: AccessoryProps) {
  const renderer = ACCESSORY_RENDERERS[props.accessory.name];
  const assetSrc = resolveAssetSrc(props.accessory);
  const fallbackPart =
    props.accessory.renderOptions.animationPart ??
    resolveFallbackPart(props.accessory);

  if (!renderer && !assetSrc) {
    return null;
  }

  const renderedAccessory = renderer ? (
    renderer(props)
  ) : assetSrc ? (
    <SvgAccessory
      assetSrc={assetSrc}
      species={props.species}
      placement={props.accessory.renderOptions.placement}
    />
  ) : null;

  if (!renderedAccessory) {
    return null;
  }

  return (
    <AnimatedAccessory fallbackPart={fallbackPart}>
      {renderedAccessory}
    </AnimatedAccessory>
  );
}
