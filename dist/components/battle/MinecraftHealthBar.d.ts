import type { CSSProperties, ReactNode } from "react";
export type MinecraftHealthBarProps = {
    health: number;
    maxHealth?: number;
    hearts?: number;
    size?: number;
    label?: ReactNode;
    showNumbers?: boolean;
    style?: CSSProperties;
};
export declare function MinecraftHealthBar({ health, maxHealth, hearts, size, label, showNumbers, style, }: MinecraftHealthBarProps): import("react/jsx-runtime").JSX.Element;
