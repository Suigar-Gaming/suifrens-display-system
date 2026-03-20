import { BullsharkAttributes } from "./bullshark-image/types.js";
import { CapyAttributes } from "./capy-image/types.js";
export declare enum SuiFrenType {
    BULLSHARK = "BULLSHARK",
    CAPY = "CAPY"
}
export type SuiFrenAttributes = CapyAttributes | BullsharkAttributes;
