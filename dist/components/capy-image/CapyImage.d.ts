import { AccessoryMetadata } from "../../utils/accessoryUtils.js";
import { CapyAttributes } from "./types.js";
export type CapyImageProps = {
    attributes: CapyAttributes;
    accessoriesByType?: Record<string, AccessoryMetadata>;
    detail?: "full" | "head";
    incognito?: boolean;
    renderMicrophoneArmInForeground?: boolean;
};
export declare function CapyImage({ attributes, accessoriesByType, detail, incognito, renderMicrophoneArmInForeground, }: CapyImageProps): import("react/jsx-runtime").JSX.Element;
