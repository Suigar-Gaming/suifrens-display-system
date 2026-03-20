import { SVGProps } from "react";
export type WildLeftEarProps = {
    earShape: "wild";
    outerEarProps?: SVGProps<SVGPathElement>;
    innerEarProps?: SVGProps<SVGPathElement>;
};
export declare function WildLeftEar({ outerEarProps, innerEarProps, }: WildLeftEarProps): import("react/jsx-runtime").JSX.Element;
