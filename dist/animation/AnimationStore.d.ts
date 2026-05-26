import { type AnimationPart } from "./parts.js";
import type { PartPose } from "./types.js";
export type AnimationRegistration = {
    getBaseTransform: () => string | undefined;
    setTransform: (value: string) => void;
    pivotOverride?: {
        x: number;
        y: number;
    };
    lastTransform?: string;
    element?: SVGGraphicsElement;
};
export declare function composePartTransform(part: AnimationPart, baseTransform: string | undefined, poses: ReadonlyMap<AnimationPart, PartPose>, pivotOverride?: {
    x: number;
    y: number;
}): string;
export declare class AnimationStore {
    readonly usesDirectDomTransforms = true;
    private registrations;
    private poses;
    private elementRegistrations;
    registerElement(part: AnimationPart, element: SVGGraphicsElement, pivotOverride?: {
        x: number;
        y: number;
    }): () => void;
    register(part: AnimationPart, registration: AnimationRegistration): () => void;
    setPose(part: AnimationPart, pose: PartPose | undefined): void;
    setPoses(poses: Map<AnimationPart, PartPose>): void;
    clear(): void;
    getRegisteredParts(): AnimationPart[];
    getAnimationTargets(): {
        part: AnimationPart;
        element: SVGGraphicsElement | undefined;
        baseTransform: string | undefined;
        pivotOverride: {
            x: number;
            y: number;
        } | undefined;
    }[];
    refresh(part: AnimationPart): void;
    private notify;
    private setTransform;
    private notifyWithDependents;
    private isDependentOn;
    private compose;
}
