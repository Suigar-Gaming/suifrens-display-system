import { type SVGProps } from "react";
import { type BullsharkSkin } from "../types.js";
type BodyPatternProps = {
    skin: BullsharkSkin;
} & SVGProps<SVGGElement>;
export declare function BodyPattern({ skin, ...svgProps }: BodyPatternProps): import("react/jsx-runtime").JSX.Element;
export {};
