import bronzeI from "../components/accessories/head/bronze-i.svg";
import bronzeIi from "../components/accessories/head/bronze-ii.svg";
import bronzeIii from "../components/accessories/head/bronze-iii.svg";
import diamondI from "../components/accessories/head/diamond-i.svg";
import diamondIi from "../components/accessories/head/diamond-ii.svg";
import diamondIii from "../components/accessories/head/diamond-iii.svg";
import goldI from "../components/accessories/head/gold-i.svg";
import goldIi from "../components/accessories/head/gold-ii.svg";
import goldIii from "../components/accessories/head/gold-iii.svg";
import legend from "../components/accessories/head/legend.svg";
import masterI from "../components/accessories/head/master-i.svg";
import masterIi from "../components/accessories/head/master-ii.svg";
import platiniumI from "../components/accessories/head/platinium-i.svg";
import platiniumIi from "../components/accessories/head/platinium-ii.svg";
import platiniumIii from "../components/accessories/head/platinium-iii.svg";
import silverI from "../components/accessories/head/silver-i.svg";
import silverIi from "../components/accessories/head/silver-ii.svg";
import silverIii from "../components/accessories/head/silver-iii.svg";
import type {
  AccessoryMetadata,
  AccessoryPlacement,
  SuiFrenSpecies,
} from "../utils/accessoryUtils.js";

export const VIP_CROWN_ACCESSORY_NAMES = [
  "bronze-i",
  "bronze-ii",
  "bronze-iii",
  "silver-i",
  "silver-ii",
  "silver-iii",
  "gold-i",
  "gold-ii",
  "gold-iii",
  "platinium-i",
  "platinium-ii",
  "platinium-iii",
  "diamond-i",
  "diamond-ii",
  "diamond-iii",
  "master-i",
  "master-ii",
  "legend",
] as const;

export type VipCrownAccessoryName = (typeof VIP_CROWN_ACCESSORY_NAMES)[number];

type VipCrownAssetMap = Record<VipCrownAccessoryName, string>;

type VipCrownPlacementMap = Record<
  VipCrownAccessoryName,
  Partial<Record<SuiFrenSpecies, AccessoryPlacement>>
>;

const VIP_CROWN_ASSET_BY_NAME: VipCrownAssetMap = {
  "bronze-i": bronzeI,
  "bronze-ii": bronzeIi,
  "bronze-iii": bronzeIii,
  "silver-i": silverI,
  "silver-ii": silverIi,
  "silver-iii": silverIii,
  "gold-i": goldI,
  "gold-ii": goldIi,
  "gold-iii": goldIii,
  "platinium-i": platiniumI,
  "platinium-ii": platiniumIi,
  "platinium-iii": platiniumIii,
  "diamond-i": diamondI,
  "diamond-ii": diamondIi,
  "diamond-iii": diamondIii,
  "master-i": masterI,
  "master-ii": masterIi,
  legend,
};

const DEFAULT_CAPY_PLACEMENT: AccessoryPlacement = {
  x: 0,
  y: 0,
  scale: 1,
  rotation: 0,
  originX: 1500,
  originY: 1500,
};

const DEFAULT_BULLSHARK_PLACEMENT: AccessoryPlacement = {
  x: 0,
  y: 0,
  scale: 1,
  rotation: 0,
  originX: 1500,
  originY: 1500,
};

// Tweak crown placement here. The SVGs are already exported in the full
// 3000x3000 SuiFren canvas, so these values are small nudge controls.
const VIP_CROWN_PLACEMENT_BY_NAME: VipCrownPlacementMap =
  VIP_CROWN_ACCESSORY_NAMES.reduce((accumulator, name) => {
    accumulator[name] = {
      capy: { ...DEFAULT_CAPY_PLACEMENT },
      bullshark: { ...DEFAULT_BULLSHARK_PLACEMENT },
    };
    return accumulator;
  }, {} as VipCrownPlacementMap);

function createVipCrownAccessory(
  name: VipCrownAccessoryName
): AccessoryMetadata {
  return {
    type: "head",
    category: "crowns",
    renderOptions: {
      showEars: true,
      showFin: true,
      assetSrc: VIP_CROWN_ASSET_BY_NAME[name],
      placement: VIP_CROWN_PLACEMENT_BY_NAME[name],
      animationPart: "head",
    },
    name,
    price: 0,
    quantity: null,
    description: `VIP ${name} crown`,
    collection: "vip",
  };
}

export const vipCrownAccessories = VIP_CROWN_ACCESSORY_NAMES.map((name) =>
  createVipCrownAccessory(name)
);
