import { composePartTransform, type AnimationStore } from "./AnimationStore.js";
import {
  interpolateSequencePoses,
  normalizePlayback,
} from "./SequencePlayer.js";
import type {
  AnimationConfig,
  AnimationSequence,
  PlaybackOptions,
} from "./types.js";

const SAMPLE_INTERVAL_MS = 1000 / 30;

type BackendPreference = "auto" | "waapi" | "fallback";

declare global {
  var __SUIFREN_ANIMATION_BACKEND__: BackendPreference | undefined;
}

type WaapiTarget = ReturnType<AnimationStore["getAnimationTargets"]>[number] & {
  element: SVGGraphicsElement;
};

type WaapiStartResult =
  | {
      handled: true;
      cleanup: () => void;
    }
  | {
      handled: false;
    };

function resolveBackendPreference(): BackendPreference {
  return globalThis.__SUIFREN_ANIMATION_BACKEND__ ?? "auto";
}

function supportsSvgWaapi() {
  return (
    typeof SVGElement !== "undefined" &&
    typeof Element !== "undefined" &&
    typeof Element.prototype.animate === "function"
  );
}

function getTargets(store: AnimationStore): WaapiTarget[] {
  return store
    .getAnimationTargets()
    .filter((target): target is WaapiTarget => Boolean(target.element));
}

function playbackDuration(
  sequence: AnimationSequence,
  playback?: PlaybackOptions
) {
  const normalized = normalizePlayback(playback);
  return sequence.duration / normalized.speed;
}

function playbackIterations(playback?: PlaybackOptions) {
  return normalizePlayback(playback).iterations;
}

function playbackDirection(
  direction: AnimationConfig["direction"],
  playback?: PlaybackOptions
): PlaybackDirection {
  const alternate = normalizePlayback(playback).alternate;
  if (direction === "reverse") {
    return alternate ? "alternate-reverse" : "reverse";
  }
  return alternate ? "alternate" : "normal";
}

function buildOffsets(sequence: AnimationSequence) {
  const offsets = new Set<number>([0, sequence.duration]);
  for (
    let time = SAMPLE_INTERVAL_MS;
    time < sequence.duration;
    time += SAMPLE_INTERVAL_MS
  ) {
    offsets.add(Math.min(sequence.duration, time));
  }
  for (const track of sequence.tracks) {
    for (const frame of track.keyframes) {
      offsets.add(Math.min(Math.max(frame.at, 0), sequence.duration));
    }
  }
  return Array.from(offsets).sort((a, b) => a - b);
}

function buildTargetKeyframes(
  target: WaapiTarget,
  sequence: AnimationSequence,
  offsets: number[]
): Keyframe[] {
  const duration = Math.max(sequence.duration, 1);
  return offsets.map((time) => ({
    offset: time / duration,
    transform: composePartTransform(
      target.part,
      target.baseTransform,
      interpolateSequencePoses(sequence, time),
      target.pivotOverride
    ),
    easing: "linear",
  }));
}

function setBaseTransforms(targets: WaapiTarget[]) {
  for (const target of targets) {
    if (target.baseTransform) {
      target.element.setAttribute("transform", target.baseTransform);
    } else {
      target.element.removeAttribute("transform");
    }
  }
}

export function startWaapiAnimation(
  store: AnimationStore,
  config: AnimationConfig | null
): WaapiStartResult {
  const preference = resolveBackendPreference();
  if (preference === "fallback") {
    return { handled: false };
  }

  if (!config) {
    store.clear();
    return { handled: true, cleanup: () => undefined };
  }

  if (!("sequence" in config)) {
    return { handled: false };
  }

  if (!supportsSvgWaapi()) {
    return preference === "waapi"
      ? { handled: true, cleanup: () => undefined }
      : { handled: false };
  }

  const playState =
    config.playState ?? (config.autoPlay === false ? "idle" : "running");
  const targets = getTargets(store);

  if (playState === "idle" || playState === "stopped") {
    store.clear();
    setBaseTransforms(targets);
    return { handled: true, cleanup: () => undefined };
  }

  if (!targets.length) {
    return { handled: false };
  }

  const sequence = config.sequence;
  if (sequence.duration <= 0) {
    return { handled: false };
  }

  store.clear();
  setBaseTransforms(targets);

  const offsets = buildOffsets(sequence);
  const animations = targets.map((target) => {
    const animation = target.element.animate(
      buildTargetKeyframes(target, sequence, offsets),
      {
        duration: playbackDuration(sequence, config.playback),
        iterations: playbackIterations(config.playback),
        direction: playbackDirection(config.direction, config.playback),
        easing: "linear",
        fill: config.holdOnComplete ? "forwards" : "none",
      }
    );

    if (config.startAt === "end") {
      animation.currentTime = playbackDuration(sequence, config.playback);
    }
    if (playState === "paused") {
      animation.pause();
    }

    if (!config.holdOnComplete) {
      animation.finished.then(() => animation.cancel()).catch(() => undefined);
    }

    return animation;
  });

  return {
    handled: true,
    cleanup: () => {
      for (const animation of animations) {
        animation.cancel();
      }
      setBaseTransforms(targets);
    },
  };
}
