import type { AccessoryMetadata, SuiFrenSpecies } from "../../utils/accessoryUtils.js";
export type BodyAccessoryProps = {
    lor?: "left" | "right";
    body?: boolean;
};
type AccessoryProps = BodyAccessoryProps & {
    accessory: AccessoryMetadata;
    species: SuiFrenSpecies;
};
export declare function Accessory(props: AccessoryProps): import("react/jsx-runtime").JSX.Element | null;
export {};
