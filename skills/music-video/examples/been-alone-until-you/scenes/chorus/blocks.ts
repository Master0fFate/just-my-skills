import { beats, line, nearestBeat } from "../../lib/song";

export type BlockKind = "hook" | "silence" | "mood";
export type Block = { index: number; kind: BlockKind; id: number; start: number; end: number };

const kinds: readonly BlockKind[] = ["hook", "hook", "silence", "hook", "hook", "mood"];
const hookSlots = [0, 1, -1, 2, 3, -1] as const;
const LEAD = 0.03;

const cutBetween = (previousId: number, nextId: number) => {
  const nextStart = line(nextId).start;
  const snapped = nearestBeat((line(previousId).end + nextStart) / 2);
  return snapped <= nextStart - LEAD ? snapped : (beats.filter((beat) => beat <= nextStart - LEAD).at(-1) ?? snapped);
};

export const buildBlocks = (ids: readonly number[], from: number, to: number): Block[] => {
  const cuts = ids.map((id, index) => (index === 0 ? from : cutBetween(ids[index - 1], id)));
  return ids.map((id, index) => ({ index, kind: kinds[index], id, start: cuts[index], end: cuts[index + 1] ?? to }));
};

export const blockAt = (blocks: Block[], t: number) => blocks.find((block) => t < block.end) ?? blocks[blocks.length - 1];

export const hookSlot = (block: Block) => hookSlots[block.index];
