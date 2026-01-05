import { getPartDefinition, type AnimationPart } from "./parts.js";
import { IDENTITY_MATRIX, matrixToString, multiplyMatrix, parseMatrix, rotateMatrix, translateMatrix } from "./matrix.js";
import type { PartPose } from "./types.js";

type Registration = {
  getBaseTransform: () => string | undefined;
  setTransform: (value: string) => void;
  pivotOverride?: { x: number; y: number };
};

const ZERO_POSE: PartPose = {};
const TRANSLATE_SCALE = 4;

export class AnimationStore {
  private registrations = new Map<AnimationPart, Set<Registration>>();
  private poses = new Map<AnimationPart, PartPose>();

  register(part: AnimationPart, registration: Registration) {
    const existing = this.registrations.get(part);
    if (existing) {
      existing.add(registration);
    } else {
      this.registrations.set(part, new Set([registration]));
    }
    const pose = this.poses.get(part) ?? ZERO_POSE;
    registration.setTransform(this.compose(part, registration, pose));
    return () => {
      const collection = this.registrations.get(part);
      if (!collection) {
        return;
      }
      collection.delete(registration);
      if (!collection.size) {
        this.registrations.delete(part);
      }
    };
  }

  setPose(part: AnimationPart, pose: PartPose | undefined) {
    if (!pose || (pose.rotate === undefined && !pose.translate)) {
      this.poses.delete(part);
    } else {
      this.poses.set(part, pose);
    }
    this.notifyWithDependents(part);
  }

  clear() {
    this.poses.clear();
    for (const part of this.registrations.keys()) {
      this.notify(part);
    }
  }

  getRegisteredParts(): AnimationPart[] {
    return Array.from(this.registrations.keys());
  }

  refresh(part: AnimationPart) {
    this.notify(part);
  }

  private notify(part: AnimationPart) {
    const pose = this.poses.get(part) ?? ZERO_POSE;
    const registrations = this.registrations.get(part);
    if (!registrations) {
      return;
    }
    for (const registration of registrations) {
      registration.setTransform(this.compose(part, registration, pose));
    }
  }

  private notifyWithDependents(part: AnimationPart) {
    for (const registeredPart of this.registrations.keys()) {
      if (registeredPart === part || this.isDependentOn(registeredPart, part)) {
        this.notify(registeredPart);
      }
    }
  }

  private isDependentOn(part: AnimationPart, ancestor: AnimationPart) {
    let current = getPartDefinition(part).parent;
    while (current) {
      if (current === ancestor) {
        return true;
      }
      current = getPartDefinition(current).parent;
    }
    return false;
  }

  private compose(part: AnimationPart, registration: Registration, pose: PartPose) {
    const baseTransform = registration.getBaseTransform();
    const baseMatrix = parseMatrix(baseTransform) ?? IDENTITY_MATRIX;
    let composed = baseMatrix;

    const pivotSource = registration.pivotOverride ?? getPartDefinition(part).pivot;

    if (pose.rotate !== undefined) {
      const rotate = rotateMatrix(pose.rotate, pivotSource.x, pivotSource.y);
      composed = multiplyMatrix(rotate, composed);
    }

    if (pose.translate) {
      const translate = translateMatrix(
        pose.translate.x * TRANSLATE_SCALE,
        pose.translate.y * TRANSLATE_SCALE
      );
      composed = multiplyMatrix(translate, composed);
    }

    let parent = getPartDefinition(part).parent;
    while (parent) {
      const parentPose = this.poses.get(parent);
      if (parentPose) {
        const parentPivot = getPartDefinition(parent).pivot;
        if (parentPose.rotate !== undefined) {
          const rotate = rotateMatrix(parentPose.rotate, parentPivot.x, parentPivot.y);
          composed = multiplyMatrix(rotate, composed);
        }
        if (parentPose.translate) {
          const translate = translateMatrix(
            parentPose.translate.x * TRANSLATE_SCALE,
            parentPose.translate.y * TRANSLATE_SCALE
          );
          composed = multiplyMatrix(translate, composed);
        }
      }
      parent = getPartDefinition(parent).parent;
    }

    return matrixToString(composed);
  }
}
