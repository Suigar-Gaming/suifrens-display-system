import { type BullsharkSkin } from "./types.js";
export declare function getThemeFromSkin(skin: BullsharkSkin, mainColor: string, secondaryColor: string): {
    head: string;
    body: string;
    legs: string;
    hands: string;
    fin: string;
    tail: string;
    patterns: string;
};
