import { AnimationStore } from "./AnimationStore.js";
import { SequencePlayer } from "./SequencePlayer.js";
import type { AnimationPart } from "./parts.js";
import type { AnimationConfig, AnimationSequence, PlaybackOptions } from "./types.js";
import { getPresetSequence } from "./presets.js";

type SequenceSource =
  | {
      sequence: AnimationSequence;
      playback?: PlaybackOptions;
    }
  | null;

export class AnimationController {
  private readonly store: AnimationStore;
  private readonly player = new SequencePlayer();
  private sequenceSource: SequenceSource = null;

  constructor(store: AnimationStore) {
    this.store = store;
  }

  load(config: AnimationConfig | null) {
    if (!config) {
      this.sequenceSource = null;
      this.player.stop();
      this.store.clear();
      return;
    }
    if ("sequence" in config) {
      this.sequenceSource = {
        sequence: config.sequence,
        playback: config.playback,
      };
    } else {
      const sequence = getPresetSequence(config.preset);
      if (!sequence) {
        this.sequenceSource = null;
        this.player.stop();
        this.store.clear();
        return;
      }
      this.sequenceSource = {
        sequence,
        playback: config.playback,
      };
    }
    this.player.load(this.sequenceSource.sequence, this.sequenceSource.playback);
    if (config.autoPlay !== false) {
      this.player.play();
    }
  }

  play(playbackOverride?: PlaybackOptions) {
    if (!this.sequenceSource) {
      return;
    }
    this.player.load(
      this.sequenceSource.sequence,
      playbackOverride ?? this.sequenceSource.playback
    );
    this.player.play();
  }

  playSequence(sequence: AnimationSequence, playback?: PlaybackOptions) {
    this.sequenceSource = { sequence, playback };
    this.player.load(sequence, playback);
    this.player.play();
  }

  stop() {
    this.player.stop();
    this.store.clear();
  }

  update(deltaMs: number) {
    if (!this.player.update(deltaMs)) {
      if (!this.player.isPlaying()) {
        this.store.clear();
      }
      return;
    }

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
