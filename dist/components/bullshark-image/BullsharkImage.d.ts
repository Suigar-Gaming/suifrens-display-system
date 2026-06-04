import { AccessoryMetadata } from "../../utils/accessoryUtils.js";
import { BullsharkAttributes } from "./types.js";
export type BullsharkImageProps = {
    attributes: BullsharkAttributes;
    accessoriesByType?: Record<string, AccessoryMetadata>;
    detail?: "full" | "head";
    incognito?: boolean;
    renderMicrophoneArmInForeground?: boolean;
};
export declare function BullsharkImage({ attributes, accessoriesByType, detail, incognito, renderMicrophoneArmInForeground, }: BullsharkImageProps): import("react/jsx-runtime").JSX.Element;
