import { getEasing } from "./easing.js";
import type { AnimationPart } from "./parts.js";
import type { AnimationSequence, AnimationTrack, PartPose, PlaybackOptions } from "./types.js";

type NormalizedPlayback = {
  iterations: number;
  alternate: boolean;
  speed: number;
};

const EPSILON = 0.0001;

function normalizePlayback(playback?: PlaybackOptions): NormalizedPlayback {
  let iterations: number;
  if (playback?.iterations === "infinite") {
    iterations = Infinity;
  } else if (typeof playback?.iterations === "number") {
    iterations = Math.max(1, playback.iterations);
  } else if (playback?.loop === true) {
    iterations = Infinity;
  } else if (typeof playback?.loop === "number") {
    iterations = Math.max(1, playback.loop);
  } else {
    iterations = 1;
  }

  return {
    iterations,
    alternate: Boolean(playback?.alternate),
    speed: playback?.speed && playback.speed > 0 ? playback.speed : 1,
  };
}

function interpolatePose(track: AnimationTrack, time: number): PartPose | undefined {
  if (!track.keyframes.length) {
    return undefined;
  }

  const duration = track.keyframes[track.keyframes.length - 1]?.at ?? 0;
  if (duration <= 0) {
    return track.keyframes[track.keyframes.length - 1]?.pose;
  }

  let previous = track.keyframes[0];
  let next = track.keyframes[track.keyframes.length - 1];

  for (let index = 0; index < track.keyframes.length; index++) {
    const frame = track.keyframes[index];
    if (frame.at <= time) {
      previous = frame;
    }
    if (frame.at >= time) {
      next = frame;
      break;
    }
  }

  if (!previous || !next) {
    return undefined;
  }

  if (next.at === previous.at) {
    return next.pose;
  }

  const localProgress = (time - previous.at) / (next.at - previous.at);
  const easing = getEasing(next.ease ?? previous.ease);
  const eased = easing(Math.min(Math.max(localProgress, 0), 1));

  const pose: PartPose = {};

  if (previous.pose.rotate !== undefined || next.pose.rotate !== undefined) {
    const start = previous.pose.rotate ?? 0;
    const end = next.pose.rotate ?? 0;
    pose.rotate = start + (end - start) * eased;
  }

  if (previous.pose.translate || next.pose.translate) {
    const start = previous.pose.translate ?? { x: 0, y: 0 };
    const end = next.pose.translate ?? { x: 0, y: 0 };
    pose.translate = {
      x: start.x + (end.x - start.x) * eased,
      y: start.y + (end.y - start.y) * eased,
    };
  }

  return pose;
}

export class SequencePlayer {
  private sequence: AnimationSequence | null = null;
  private playback: NormalizedPlayback = normalizePlayback();
  private time = 0;
  private direction: 1 | -1 = 1;
  private completedIterations = 0;
  private playing = false;
  private currentPoses = new Map<AnimationPart, PartPose>();

  load(sequence: AnimationSequence, playback?: PlaybackOptions) {
    this.sequence = sequence;
    this.playback = normalizePlayback(playback);
    this.time = 0;
    this.direction = 1;
    this.completedIterations = 0;
    this.playing = false;
    this.currentPoses.clear();
    this.recalculate();
  }

  play() {
    if (!this.sequence) {
      return;
    }
    this.playing = true;
  }

  stop() {
    this.playing = false;
    this.time = 0;
    this.direction = 1;
    this.completedIterations = 0;
    this.currentPoses.clear();
  }

  isPlaying() {
    return this.playing;
  }

  update(deltaMs: number) {
    if (!this.sequence || !this.playing) {
      return false;
    }

    const duration = this.sequence.duration;
    if (duration <= 0) {
      return false;
    }

    const advanceBy = deltaMs * this.playback.speed;

    if (this.direction === 1) {
      this.time += advanceBy;
      if (this.time >= duration - EPSILON) {
        this.time = duration;
        this.handleIterationEnd();
      }
    } else {
      this.time -= advanceBy;
      if (this.time <= EPSILON) {
        this.time = 0;
        this.handleIterationEnd();
      }
    }

    this.recalculate();
    return true;
  }

  getCurrentPoses() {
    return this.currentPoses;
  }

  private handleIterationEnd() {
    this.completedIterations += 1;

    if (this.completedIterations >= this.playback.iterations) {
      this.playing = false;
      return;
    }

    if (this.playback.alternate) {
      this.direction = this.direction === 1 ? -1 : 1;
    } else {
      this.time = 0;
    }
  }

  private recalculate() {
    if (!this.sequence) {
      return;
    }

    const effectiveTime =
      this.playback.alternate && this.direction === -1
        ? this.sequence.duration - this.time
        : this.time;

    this.currentPoses.clear();

    for (const track of this.sequence.tracks) {
      const pose = interpolatePose(track, effectiveTime);
      if (pose) {
        this.currentPoses.set(track.part, pose);
      }
    }
  }
}
