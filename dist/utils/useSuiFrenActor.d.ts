import type { PlaybackOptions } from "../animation/types.js";
export type LocomotionState = "idle" | "walk" | "run" | "jump" | "crouch" | "crouchWalk";
export type FacingDirection = "left" | "right";
export type SuiFrenActorPose = {
    position: {
        x: number;
        y: number;
    };
    elevation: number;
    facing: FacingDirection;
};
export type SuiFrenActorOptions<TExpression extends string = string> = {
    initialPosition?: {
        x: number;
        y: number;
    };
    bounds?: {
        width: number;
        height: number;
        padding?: number;
    };
    moveSpeed?: number;
    runMultiplier?: number;
    crouchMultiplier?: number;
    /**
     * Units per second squared applied while moving.
     */
    acceleration?: number;
    /**
     * Units per second squared applied while stopping.
     */
    deceleration?: number;
    jumpStrength?: number;
    gravity?: number;
    /**
     * How often (ms) to sync React state. Higher = fewer rerenders; visual pose still updates via poseRef/onPose.
     */
    reactSyncIntervalMs?: number;
    /**
     * Expression used when no emote is active.
     */
    defaultExpression: TExpression;
    /**
     * Optional callback fired every frame with pose.
     */
    onPose?: (pose: SuiFrenActorPose) => void;
};
export type SuiFrenActorSnapshot<TExpression extends string = string> = {
    position: {
        x: number;
        y: number;
    };
    elevation: number;
    facing: FacingDirection;
    locomotion: LocomotionState;
    animationPreset: string;
    animationPlayback?: PlaybackOptions;
    animationHoldOnComplete?: boolean;
    animationTrigger: number;
    expression: TExpression;
    baseExpression: TExpression;
};
export type SuiFrenActorControls<TExpression extends string = string> = {
    setDirection: (x: number, y: number) => void;
    setRun: (run: boolean) => void;
    setCrouch: (crouch: boolean) => void;
    requestJump: () => void;
    triggerEmote: (expression: TExpression, durationMs?: number) => void;
    setBaseExpression: (expression: TExpression) => void;
    reset: (position?: {
        x: number;
        y: number;
    }) => void;
};
export declare function useSuiFrenActor<TExpression extends string = string>(options: SuiFrenActorOptions<TExpression>): {
    state: SuiFrenActorSnapshot<TExpression>;
    controls: SuiFrenActorControls<TExpression>;
    poseRef: import("react").MutableRefObject<SuiFrenActorPose>;
};
