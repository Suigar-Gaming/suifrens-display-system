import type { CSSProperties, ReactNode } from "react";
import type { AnimationConfig } from "../../animation/types.js";
import type { SuiFrenAttributes } from "../types.js";
import { type MinecraftHealthBarProps } from "./MinecraftHealthBar.js";
export type SuiFrenBattleSpriteProps = {
    attributes: SuiFrenAttributes;
    animation?: AnimationConfig | null;
    health: number;
    maxHealth: number;
    label?: ReactNode;
    facing?: "left" | "right";
    size?: number;
    shadow?: boolean;
    healthBarProps?: Omit<MinecraftHealthBarProps, "health" | "maxHealth" | "label">;
    imageStyle?: CSSProperties;
    hitFlashTrigger?: string | number | null;
    style?: CSSProperties;
};
export declare function SuiFrenBattleSprite({ attributes, animation, health, maxHealth, label, facing, size, shadow, healthBarProps, imageStyle, hitFlashTrigger, style, }: SuiFrenBattleSpriteProps): import("react/jsx-runtime").JSX.Element;
