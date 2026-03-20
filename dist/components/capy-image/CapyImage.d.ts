import { AccessoryMetadata } from "../../utils/accessoryUtils.js";
import { CapyAttributes } from "./types.js";
export type CapyImageProps = {
    attributes: CapyAttributes;
    accessoriesByType?: Record<string, AccessoryMetadata>;
    incognito?: boolean;
};
export declare function CapyImage({ attributes, accessoriesByType, incognito, }: CapyImageProps): import("react/jsx-runtime").JSX.Element;
