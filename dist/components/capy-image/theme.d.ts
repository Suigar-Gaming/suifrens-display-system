import { type CapySkin } from "./types.js";
export declare function getThemeFromSkin(skin: CapySkin, mainColor: string, secondaryColor: string, incognito: boolean): {
    head: string;
    body: string;
    legs: string;
    arms: string;
    outerEars: string;
    innerEars: string;
    patterns: string;
    nose: string;
    appendages: string;
};
