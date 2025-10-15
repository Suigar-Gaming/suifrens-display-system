import { getPartDefinition, type AnimationPart } from "./parts.js";
import { IDENTITY_MATRIX, matrixToString, multiplyMatrix, parseMatrix, rotateMatrix, translateMatrix } from "./matrix.js";
import type { PartPose } from "./types.js";

type Registration = {
  getBaseTransform: () => string | undefined;
  setTransform: (value: string) => void;
  pivotOverride?: { x: number; y: number };
};

const ZERO_POSE: PartPose = {};

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
    this.notify(part);
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
      const translate = translateMatrix(pose.translate.x, pose.translate.y);
      composed = multiplyMatrix(translate, composed);
    }

    return matrixToString(composed);
  }
}
