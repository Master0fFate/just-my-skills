import { useAudioData, visualizeAudio } from "@remotion/media-utils";
import { staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { AUDIO } from "../config";

const BINS = 64;

const BANDS = {
  low: { from: 0, to: 3, floor: -45, range: 37 },
  mid: { from: 3, to: 20, floor: -62, range: 30 },
  high: { from: 20, to: BINS, floor: -80, range: 32 },
} as const;

type Band = (typeof BANDS)[keyof typeof BANDS];

const level = (spectrum: number[], { from, to, floor, range }: Band) => {
  const mean = spectrum.slice(from, to).reduce((sum, v) => sum + v, 0) / (to - from);
  return Math.min(1, Math.max(0, (20 * Math.log10(mean + 1e-9) - floor) / range));
};

export const useLevels = () => {
  const audioData = useAudioData(staticFile(AUDIO));
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  if (!audioData) return { low: 0, mid: 0, high: 0 };
  const spectrum = visualizeAudio({ fps, frame, audioData, numberOfSamples: BINS });
  return { low: level(spectrum, BANDS.low), mid: level(spectrum, BANDS.mid), high: level(spectrum, BANDS.high) };
};
