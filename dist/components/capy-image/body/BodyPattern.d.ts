import { type SVGProps } from "react";
import { type CapySkin } from "../types.js";
type BodyPatternProps = {
    skin: CapySkin;
} & SVGProps<SVGGElement>;
export declare function BodyPattern({ skin, ...svgProps }: BodyPatternProps): import("react/jsx-runtime").JSX.Element;
export {};
