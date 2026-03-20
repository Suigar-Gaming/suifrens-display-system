import bronzeI from "./head/bronze-i.svg";
import bronzeIi from "./head/bronze-ii.svg";
import bronzeIii from "./head/bronze-iii.svg";
import diamondI from "./head/diamond-i.svg";
import diamondIi from "./head/diamond-ii.svg";
import diamondIii from "./head/diamond-iii.svg";
import goldI from "./head/gold-i.svg";
import goldIi from "./head/gold-ii.svg";
import goldIii from "./head/gold-iii.svg";
import legend from "./head/legend.svg";
import masterI from "./head/master-i.svg";
import masterIi from "./head/master-ii.svg";
import platiniumI from "./head/platinium-i.svg";
import platiniumIi from "./head/platinium-ii.svg";
import platiniumIii from "./head/platinium-iii.svg";
import silverI from "./head/silver-i.svg";
import silverIi from "./head/silver-ii.svg";
import silverIii from "./head/silver-iii.svg";

const VIP_CROWN_ASSET_BY_NAME: Record<string, string> = {
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

export function getVipCrownAssetSrc(name: string) {
  return VIP_CROWN_ASSET_BY_NAME[name];
}
