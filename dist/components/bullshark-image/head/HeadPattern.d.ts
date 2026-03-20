import { type SVGProps } from "react";
import { type BullsharkSkin } from "../types.js";
type HeadPatternProps = {
    skin: BullsharkSkin;
} & SVGProps<SVGGElement>;
export declare function HeadPattern({ skin, ...svgProps }: HeadPatternProps): import("react/jsx-runtime").JSX.Element;
export {};
