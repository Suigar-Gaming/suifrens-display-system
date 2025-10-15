import { colors } from "../../constants/colors.js";

export type BullsharkSkin =
  | "basic"
  | "cheetah"
  | "fox"
  | "panda"
  | "stripes"
  | "snake"
  | "lizard"
  | "dalmation";

export type BullsharkExpression =
  | "angry"
  | "annoyed"
  | "bigSmile"
  | "blush"
  | "cool"
  | "crying"
  | "happy"
  | "heartEyes"
  | "kiss"
  | "laughing"
  | "mischievous"
  | "relaxed"
  | "sad"
  | "shocked"
  | "sleepy"
  | "tongueOut"
  | "wink"
  | "dizzyFace"
  | "goofy"
  | "grimace"
  | "ourah"
  | "showing";

export type BullsharkFinStyle = "classic";

export type BullsharkAttributes = {
  mainColor: keyof typeof colors;
  secondaryColor: keyof typeof colors;
  skin: BullsharkSkin;
  expression: BullsharkExpression;
  finStyle: BullsharkFinStyle;
};
