import { DefaultLeftEarProps } from "./left/DefaultLeftEar.js";
import { MischievousLeftEarProps } from "./left/MichievousLeftEar.js";
import { QuietLeftEarProps } from "./left/QuietLeftEar.js";
import { WildLeftEarProps } from "./left/WildLeftEar.js";
type LeftEarProps = DefaultLeftEarProps | WildLeftEarProps | MischievousLeftEarProps | QuietLeftEarProps;
export declare function LeftEar({ ...props }: LeftEarProps): import("react/jsx-runtime").JSX.Element;
export {};
