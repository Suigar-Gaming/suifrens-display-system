import { type SVGProps } from "react";
import { type BullsharkSkin } from "../types.js";
type FinPatternProps = {
    skin: BullsharkSkin;
} & SVGProps<SVGGElement>;
export declare function FinPattern({ skin, ...svgProps }: FinPatternProps): import("react/jsx-runtime").JSX.Element;
export {};
