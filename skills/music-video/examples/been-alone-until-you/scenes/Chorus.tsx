import { useMemo } from "react";
import { AbsoluteFill } from "remotion";
import { color, FPS } from "../config";
import { useScene } from "../lib/clock";
import { clamp, noise, progress } from "../lib/motion";
import { barAt, barPulse, line } from "../lib/song";
import { blockAt, buildBlocks, type Block } from "./chorus/blocks";
import { Flatline } from "./chorus/Flatline";
import { kick } from "./chorus/fx";
import { HookType } from "./chorus/HookType";
import { MoodFace } from "./chorus/MoodFace";
import { themes, paletteAt, type Look, type Variant } from "./chorus/theme";
import { TwoLights3D } from "./chorus/TwoLights3D";
import { WindowGrid } from "./chorus/WindowGrid";

const ids = { 1: [9, 10, 11, 12, 13, 14], 2: [24, 25, 26, 27, 28, 29], 3: [35, 36, 37, 38, 39, 40] } as const;
const FLASH_FRAMES = [1, 0.55, 0.2] as const;
const LIGHT_GAIN = { hook: 1, silence: 0.3, mood: 0.55 } as const;
const PAPER_GAIN = 0.4;

const flashAt = (since: number) => FLASH_FRAMES[Math.floor(since * FPS + 1e-6)] ?? 0;

const windowDensity = (block: Block, t: number, look: Look) => {
  if (block.kind === "silence") return 0.03 + 0.22 * progress(t, line(block.id).start, line(block.id).end - line(block.id).start);
  return look.variant === 3 ? 0.22 : 0.14;
};

export const Chorus = ({ variant }: { variant: Variant }) => {
  const { t, from, to } = useScene();
  const blocks = useMemo(() => buildBlocks(ids[variant], from, to), [variant, from, to]);
  const block = blockAt(blocks, t);
  const theme = themes[variant];
  const look: Look = { variant, theme, palette: paletteAt(variant, block, t) };

  const since = t - block.start;
  const hit = kick(t);
  const drift = progress(t, block.start, block.end - block.start);
  const zoom = 1 + theme.punch * (hit + barPulse(t, 6)) + theme.camera * (0.06 * Math.exp(-since * 14) + 0.03 * drift);
  const sway = theme.shake * (0.3 + hit);
  const transform = `translate(${noise(t * 9, 1) * sway}px, ${noise(t * 9, 2) * sway}px) rotate(${noise(t * 0.7, 6) * 0.5 * theme.camera}deg) scale(${zoom})`;

  const youStart = line(block.id).words.at(-1)?.start ?? 0;
  const remaining = block.end - t;
  const endFlash = block.kind === "mood" && remaining < 4 / FPS ? clamp(1 - (remaining * FPS - 1) / 3) : 0;
  const whiteFlash = Math.max(
    flashAt(since) * theme.cutFlash,
    flashAt(barAt(t).since) * theme.barFlash,
    endFlash * (0.6 + 0.4 * theme.cutFlash),
  );
  const violetFlash = block.kind === "hook" ? flashAt(t - youStart) * theme.youFlash : 0;

  return (
    <AbsoluteFill style={{ background: look.palette.bg }}>
      <AbsoluteFill style={{ transform }}>
        {theme.windows && <WindowGrid look={look} density={windowDensity(block, t, look)} opacity={look.palette.inverted ? 0.4 : 0.5} />}
        <TwoLights3D look={look} gain={LIGHT_GAIN[block.kind] * (look.palette.inverted ? PAPER_GAIN : 1)} />
        {block.kind === "hook" && <HookType block={block} look={look} />}
        {block.kind === "silence" && <Flatline block={block} look={look} />}
        {block.kind === "mood" && <MoodFace block={block} look={look} />}
      </AbsoluteFill>
      {whiteFlash > 0 && <AbsoluteFill style={{ background: look.palette.inverted ? color.ink : color.paper, opacity: whiteFlash }} />}
      {violetFlash > 0 && <AbsoluteFill style={{ background: color.accent, opacity: violetFlash }} />}
    </AbsoluteFill>
  );
};
