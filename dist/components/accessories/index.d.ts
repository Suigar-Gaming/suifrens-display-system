import type { AccessoryMetadata, SuiFrenSpecies } from "../../utils/accessoryUtils.js";
import type { AccessoryRenderer, BodyAccessoryProps } from "./AccessorySlot.js";
export type { BodyAccessoryProps } from "./AccessorySlot.js";
type AccessoryProps = BodyAccessoryProps & {
    accessory: AccessoryMetadata;
    species: SuiFrenSpecies;
};
export declare const ACCESSORY_RENDERERS: Record<string, AccessoryRenderer>;
export declare function InlineAccessory(props: AccessoryProps): import("react/jsx-runtime").JSX.Element | null;
export declare const Accessory: typeof InlineAccessory;
