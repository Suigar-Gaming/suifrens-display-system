export type AnimationPart = "body" | "head" | "leftArm" | "rightArm" | "leftLeg" | "rightLeg" | "tail" | "fin";
type PartDefinition = {
    pivot: {
        x: number;
        y: number;
    };
    autoDetectTransforms: string[];
    parent?: AnimationPart;
};
export declare function getPartDefinition(part: AnimationPart): PartDefinition;
export declare function matchPartByTransform(transform: string | null): AnimationPart | null;
export declare function formatNumber(value: number): string;
export {};
