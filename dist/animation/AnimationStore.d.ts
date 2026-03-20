import { type AnimationPart } from "./parts.js";
import type { PartPose } from "./types.js";
type Registration = {
    getBaseTransform: () => string | undefined;
    setTransform: (value: string) => void;
    pivotOverride?: {
        x: number;
        y: number;
    };
};
export declare class AnimationStore {
    private registrations;
    private poses;
    register(part: AnimationPart, registration: Registration): () => void;
    setPose(part: AnimationPart, pose: PartPose | undefined): void;
    clear(): void;
    getRegisteredParts(): AnimationPart[];
    refresh(part: AnimationPart): void;
    private notify;
    private notifyWithDependents;
    private isDependentOn;
    private compose;
}
export {};
