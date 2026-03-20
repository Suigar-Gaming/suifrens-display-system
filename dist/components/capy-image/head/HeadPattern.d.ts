import { type SVGProps } from "react";
import { type CapySkin } from "../types.js";
type HeadPatternProps = {
    skin: CapySkin;
    noseProps: SVGProps<SVGPathElement>;
} & SVGProps<SVGGElement>;
export declare function HeadPattern({ skin, noseProps, ...headPatternProps }: HeadPatternProps): import("react/jsx-runtime").JSX.Element;
export {};
