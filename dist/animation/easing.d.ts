import { EasingName } from "./types.js";
export type EasingFunction = (t: number) => number;
export declare function getEasing(name: EasingName | undefined): EasingFunction;
