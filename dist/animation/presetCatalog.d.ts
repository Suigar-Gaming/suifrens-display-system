import type { AnimationConfig } from "./types.js";
export type PresetCatalogEntry = {
    label: string;
    name: string;
    config: AnimationConfig;
};
export type PresetCatalogGroup = {
    title: string;
    presets: PresetCatalogEntry[];
};
export declare const PRESET_CATALOG: PresetCatalogGroup[];
