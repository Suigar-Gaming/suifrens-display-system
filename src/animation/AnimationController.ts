import { AnimationStore } from "./AnimationStore.js";
import { SequencePlayer } from "./SequencePlayer.js";
import type { AnimationPart } from "./parts.js";
import type {
  AnimationConfig,
  AnimationSequence,
  PlaybackOptions,
  PlayState,
} from "./types.js";
import { getPresetSequence } from "./presets.js";

type SequenceSource =
  | {
      sequence: AnimationSequence;
      playback?: PlaybackOptions;
    }
  | null;

function playbackSignature(playback?: PlaybackOptions) {
  let iterations: number;
  if (playback?.iterations === "infinite" || playback?.loop === true) {
    iterations = Infinity;
  } else if (typeof playback?.iterations === "number") {
    iterations = Math.max(1, playback.iterations);
  } else if (typeof playback?.loop === "number") {
    iterations = Math.max(1, playback.loop);
  } else {
    iterations = 1;
  }

  const alternate = Boolean(playback?.alternate);
  const speed = playback?.speed && playback.speed > 0 ? playback.speed : 1;
  return `${iterations}|${alternate ? 1 : 0}|${speed}`;
}

export class AnimationController {
  private readonly store: AnimationStore;
  private readonly player = new SequencePlayer();
  private sequenceSource: SequenceSource = null;
  private playbackSignature: string | null = null;
  private currentDirection: 1 | -1 = 1;
  private currentPlayState: PlayState = "idle";
  private lastTrigger: string | number | undefined;
  private holdOnComplete = false;

  constructor(store: AnimationStore) {
    this.store = store;
  }

  applyConfig(config: AnimationConfig | null) {
    if (!config) {
      this.sequenceSource = null;
      this.playbackSignature = null;
      this.currentDirection = 1;
      this.currentPlayState = "idle";
      this.lastTrigger = undefined;
      this.holdOnComplete = false;
      this.player.stop();
      this.store.clear();
      return;
    }

    const sequence = this.resolveSequence(config);
    if (!sequence) {
      this.sequenceSource = null;
      this.playbackSignature = null;
      this.currentDirection = 1;
      this.currentPlayState = "idle";
      this.lastTrigger = undefined;
      this.holdOnComplete = false;
      this.player.stop();
      this.store.clear();
      return;
    }

    const direction: 1 | -1 = config.direction === "reverse" ? -1 : 1;
    const startAt = config.startAt ?? (direction === -1 ? "end" : "start");
    const incomingSignature = playbackSignature(config.playback);
    const sequenceChanged = this.sequenceSource?.sequence !== sequence;
    const playbackChanged = this.playbackSignature !== incomingSignature;

    if (sequenceChanged) {
      this.player.load(sequence, config.playback, { direction, startAt });
    } else {
      if (playbackChanged) {
        this.player.setPlayback(config.playback);
      }
      if (direction !== this.currentDirection) {
        this.player.setDirection(direction, true, startAt);
      }
    }

    if (config.trigger !== undefined && config.trigger !== this.lastTrigger) {
      this.player.restart(startAt);
      this.syncCurrentPoses();
    } else if (sequenceChanged || playbackChanged) {
      this.syncCurrentPoses();
    }

    this.sequenceSource = { sequence, playback: config.playback };
    this.playbackSignature = incomingSignature;
    this.currentDirection = direction;
    this.holdOnComplete = Boolean(config.holdOnComplete);
    this.lastTrigger = config.trigger;

    const playState = this.resolvePlayState(config);
    this.currentPlayState = playState;

    switch (playState) {
      case "running":
        this.player.play();
        break;
      case "paused":
        this.player.pause();
        this.syncCurrentPoses();
        break;
      case "idle":
      case "stopped":
      default:
        this.player.stop(true);
        this.player.setDirection(direction, true, startAt);
        this.store.clear();
        break;
    }

    if (playState === "running" && config.trigger !== undefined) {
      this.player.play();
    }
  }

  stop() {
    this.player.stop();
    this.currentPlayState = "idle";
    this.store.clear();
  }

  update(deltaMs: number) {
    if (!this.player.update(deltaMs)) {
      if (!this.player.isPlaying()) {
        if (this.currentPlayState === "paused") {
          this.syncCurrentPoses();
        } else if (this.currentPlayState === "running") {
          if (this.holdOnComplete && this.player.hasActivePose()) {
            this.syncCurrentPoses();
          } else {
            this.store.clear();
          }
        } else {
          this.store.clear();
        }
      }
      return;
    }

    this.syncCurrentPoses();
  }

  private resolveSequence(config: AnimationConfig): AnimationSequence | null {
    if ("sequence" in config) {
      return config.sequence;
    }
    return getPresetSequence(config.preset) ?? null;
  }

  private resolvePlayState(config: AnimationConfig): PlayState {
    if (config.playState) {
      return config.playState;
    }
    if (config.autoPlay === false) {
      return "idle";
    }
    return "running";
  }

  private syncCurrentPoses() {
    const poses = this.player.getCurrentPoses();
    const touchedParts = new Set<AnimationPart>();

    for (const [part, pose] of poses.entries()) {
      touchedParts.add(part);
      this.store.setPose(part, pose);
    }

    // Reset parts that were animated previously but not in the current frame.
    for (const part of this.store.getRegisteredParts()) {
      if (!touchedParts.has(part)) {
        this.store.setPose(part, undefined);
      }
    }
  }
}
