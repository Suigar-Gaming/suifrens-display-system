import { type SVGProps } from "react";
import { type BullsharkSkin } from "../types.js";
type TailPatternProps = {
    skin: BullsharkSkin;
} & SVGProps<SVGGElement>;
export declare function TailPattern({ skin, ...svgProps }: TailPatternProps): import("react/jsx-runtime").JSX.Element;
export {};
