import type { AnimationConfig, PlaybackOptions } from "../../animation/types.js";
export type DuelSide = "left" | "right";
type DuelHealth = Record<DuelSide, number>;
export type DuelFighterState<TExpression extends string = string> = {
    health: number;
    maxHealth: number;
    expression: TExpression;
    baseExpression: TExpression;
    animation: AnimationConfig | null;
    status: "alive" | "dead";
};
export type DuelState<TExpression extends string = string> = {
    left: DuelFighterState<TExpression>;
    right: DuelFighterState<TExpression>;
    phase: string;
    running: boolean;
};
export type DuelWaitStep = {
    type: "wait";
    ms: number;
    label?: string;
};
export type DuelPoseStep<TExpression extends string = string> = {
    type: "pose";
    label: string;
    side: DuelSide;
    preset: string;
    playback?: PlaybackOptions;
    holdOnComplete?: boolean;
    expression?: TExpression;
    durationMs?: number;
    revertToIdle?: boolean;
};
export type DuelAttackStep<TExpression extends string = string> = {
    type: "attack";
    label: string;
    attacker: DuelSide;
    preset: string;
    target: DuelSide;
    damage: number;
    hitPreset?: string;
    hitDelayMs?: number;
    attackerExpression?: TExpression;
    targetExpression?: TExpression;
    afterMs?: number;
};
export type DuelDeathStep<TExpression extends string = string> = {
    type: "death";
    label: string;
    side: DuelSide;
    preset: string;
    expression?: TExpression;
    afterMs?: number;
};
export type DuelVictoryStep<TExpression extends string = string> = {
    type: "victory";
    label: string;
    side: DuelSide;
    preset?: string;
    loops?: number;
    expression?: TExpression;
    afterMs?: number;
};
export type DuelStep<TExpression extends string = string> = DuelWaitStep | DuelPoseStep<TExpression> | DuelAttackStep<TExpression> | DuelDeathStep<TExpression> | DuelVictoryStep<TExpression>;
export type DuelScript<TExpression extends string = string> = {
    name: string;
    steps: DuelStep<TExpression>[];
};
export type UseDuelScriptOptions<TExpression extends string = string> = {
    script: DuelScript<TExpression>;
    baseExpression: Record<DuelSide, TExpression>;
    maxHealth?: number | DuelHealth;
    initialHealth?: number | DuelHealth;
    idlePreset?: string;
    autoStart?: boolean;
    disabled?: boolean;
};
export declare function useDuelScript<TExpression extends string = string>({ script, baseExpression, maxHealth: maxHealthProp, initialHealth: initialHealthProp, idlePreset, autoStart, disabled, }: UseDuelScriptOptions<TExpression>): {
    state: DuelState<TExpression>;
    restart: () => void;
    stop: () => void;
    reset: () => void;
};
export {};
