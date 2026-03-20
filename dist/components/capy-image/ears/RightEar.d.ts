import { DefaultRightEarProps } from "./right/DefaultRightEar.js";
import { MischievousRightEarProps } from "./right/MichievousRightEar.js";
import { QuietRightEarProps } from "./right/QuietRightEar.js";
import { WildRightEarProps } from "./right/WildRightEar.js";
type RightEarProps = DefaultRightEarProps | WildRightEarProps | MischievousRightEarProps | QuietRightEarProps;
export declare function RightEar({ ...props }: RightEarProps): import("react/jsx-runtime").JSX.Element;
export {};
