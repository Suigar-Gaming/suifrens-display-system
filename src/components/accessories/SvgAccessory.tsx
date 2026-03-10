import type {
  AccessoryPlacement,
  SuiFrenSpecies,
} from "../../utils/accessoryUtils.js";

const DEFAULT_ORIGIN = 1500;
const SCALE_EPSILON = 0.0001;

function buildPlacementTransform(placement?: AccessoryPlacement) {
  if (!placement) {
    return undefined;
  }

  const transforms: string[] = [];
  const x = placement.x ?? 0;
  const y = placement.y ?? 0;
  const rotation = placement.rotation ?? 0;
  const scale = placement.scale ?? 1;
  const originX = placement.originX ?? DEFAULT_ORIGIN;
  const originY = placement.originY ?? DEFAULT_ORIGIN;

  if (x !== 0 || y !== 0) {
    transforms.push(`translate(${x} ${y})`);
  }
  if (rotation !== 0) {
    transforms.push(`rotate(${rotation} ${originX} ${originY})`);
  }
  if (Math.abs(scale - 1) > SCALE_EPSILON) {
    transforms.push(`translate(${originX} ${originY})`);
    transforms.push(`scale(${scale})`);
    transforms.push(`translate(${-originX} ${-originY})`);
  }

  return transforms.length > 0 ? transforms.join(" ") : undefined;
}

export type SvgAccessoryProps = {
  assetSrc: string;
  species: SuiFrenSpecies;
  placement?: Partial<Record<SuiFrenSpecies, AccessoryPlacement>>;
};

export function SvgAccessory({
  assetSrc,
  species,
  placement,
}: SvgAccessoryProps) {
  const resolvedPlacement = placement?.[species];
  const transform = buildPlacementTransform(resolvedPlacement);

  return (
    <g transform={transform}>
      <image
        href={assetSrc}
        x="0"
        y="0"
        width="3000"
        height="3000"
        preserveAspectRatio="xMidYMid meet"
      />
    </g>
  );
}
