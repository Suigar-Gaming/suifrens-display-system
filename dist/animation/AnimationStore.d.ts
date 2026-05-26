import { type AnimationPart } from "./parts.js";
import type { PartPose } from "./types.js";
type Registration = {
    getBaseTransform: () => string | undefined;
    setTransform: (value: string) => void;
    pivotOverride?: {
        x: number;
        y: number;
    };
    lastTransform?: string;
};
export declare class AnimationStore {
    readonly usesDirectDomTransforms = true;
    private registrations;
    private poses;
    private elementRegistrations;
    registerElement(part: AnimationPart, element: SVGGraphicsElement, pivotOverride?: {
        x: number;
        y: number;
    }): () => void;
    register(part: AnimationPart, registration: Registration): () => void;
    setPose(part: AnimationPart, pose: PartPose | undefined): void;
    setPoses(poses: Map<AnimationPart, PartPose>): void;
    clear(): void;
    getRegisteredParts(): AnimationPart[];
    refresh(part: AnimationPart): void;
    private notify;
    private setTransform;
    private notifyWithDependents;
    private isDependentOn;
    private compose;
}
export {};
