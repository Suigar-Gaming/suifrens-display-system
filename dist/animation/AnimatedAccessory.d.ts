import { type ReactElement } from "react";
import { type AnimationPart } from "./parts.js";
type AnimatedAccessoryProps = {
    children: ReactElement;
    fallbackPart?: AnimationPart;
};
export declare function AnimatedAccessory({ children, fallbackPart }: AnimatedAccessoryProps): import("react/jsx-runtime").JSX.Element;
export {};
