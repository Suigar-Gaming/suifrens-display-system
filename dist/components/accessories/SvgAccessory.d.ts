import type { AccessoryPlacement, SuiFrenSpecies } from "../../utils/accessoryUtils.js";
export type SvgAccessoryProps = {
    assetSrc: string;
    species: SuiFrenSpecies;
    placement?: Partial<Record<SuiFrenSpecies, AccessoryPlacement>>;
};
export declare function SvgAccessory({ assetSrc, species, placement, }: SvgAccessoryProps): import("react/jsx-runtime").JSX.Element;
