import { AccessoryMetadata } from "../../utils/accessoryUtils.js";
import { BullsharkAttributes } from "./types.js";
export type BullsharkImageProps = {
    attributes: BullsharkAttributes;
    accessoriesByType?: Record<string, AccessoryMetadata>;
    incognito?: boolean;
};
export declare function BullsharkImage({ attributes, accessoriesByType, incognito, }: BullsharkImageProps): import("react/jsx-runtime").JSX.Element;
