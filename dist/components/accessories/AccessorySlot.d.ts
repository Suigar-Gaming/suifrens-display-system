import { type ReactNode } from "react";
import type { AccessoryMetadata, SuiFrenSpecies } from "../../utils/accessoryUtils.js";
export type BodyAccessoryProps = {
    lor?: "left" | "right";
    body?: boolean;
};
export type AccessoryRendererProps = BodyAccessoryProps & {
    accessory: AccessoryMetadata;
    species: SuiFrenSpecies;
};
export type AccessoryRenderer = (props: AccessoryRendererProps) => JSX.Element | null;
export declare function AccessoryRendererProvider({ renderer, children, }: {
    renderer: AccessoryRenderer;
    children: ReactNode;
}): import("react/jsx-runtime").JSX.Element;
export declare function AccessorySlot(props: AccessoryRendererProps): JSX.Element | null;
