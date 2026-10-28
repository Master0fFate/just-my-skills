import { rand } from "../../lib/motion";

export type Vec3 = [number, number, number];

export type Cell = { col: number; row: number };

export type TowerSpec = {
  seed: number;
  cols: number;
  rows: number;
  sideCols: number;
  position: Vec3;
};

export type QuadSet = { count: number; matrices: Float32Array; colors: Float32Array };

export const PANE = { width: 1, height: 1.5 } as const;
export const PITCH = { x: 1.6, y: 2.4 } as const;

export const LAYER = { structure: 0, frame: 0.012, pane: 0.024, blind: 0.036, glow: 0.045, room: 0.05 } as const;

export const MAIN_TOWER: TowerSpec = { seed: 3, cols: 44, rows: 90, sideCols: 28, position: [0, 0, 0] };

export const NEIGHBOURS: TowerSpec[] = [
  { seed: 11, cols: 18, rows: 70, sideCols: 14, position: [-82, 0, -52] },
  { seed: 17, cols: 26, rows: 105, sideCols: 20, position: [-18, 0, -125] },
  { seed: 23, cols: 16, rows: 62, sideCols: 12, position: [78, 0, -96] },
  { seed: 29, cols: 22, rows: 84, sideCols: 16, position: [-135, 0, -150] },
];

export const LIT_CELL: Cell = { col: 37, row: 14 };

export const windowCenter = (spec: TowerSpec, cell: Cell): Vec3 => [
  spec.position[0] + (cell.col - spec.cols / 2 + 0.5) * PITCH.x,
  spec.position[1] + (cell.row + 0.5) * PITCH.y,
  spec.position[2],
];

export const LIT_CENTER = windowCenter(MAIN_TOWER, LIT_CELL);

const quadSet = (capacity: number): QuadSet => ({
  count: 0,
  matrices: new Float32Array(capacity * 16),
  colors: new Float32Array(capacity * 3),
});

const pushQuad = (set: QuadSet, x: number, y: number, width: number, height: number, r: number, g: number, b: number) => {
  const m = set.count * 16;
  set.matrices[m] = width;
  set.matrices[m + 5] = height;
  set.matrices[m + 10] = 1;
  set.matrices[m + 12] = x;
  set.matrices[m + 13] = y;
  set.matrices[m + 15] = 1;
  const c = set.count * 3;
  set.colors[c] = r;
  set.colors[c + 1] = g;
  set.colors[c + 2] = b;
  set.count++;
};

const trim = (set: QuadSet): QuadSet => ({
  count: set.count,
  matrices: set.matrices.slice(0, set.count * 16),
  colors: set.colors.slice(0, set.count * 3),
});

type FaceData = { panes: QuadSet; blinds: QuadSet; structure: QuadSet; frames: QuadSet };

export const buildFace = (cols: number, rows: number, seed: number, skip?: Cell): FaceData => {
  const panes = quadSet(cols * rows * 2);
  const blinds = quadSet(cols * rows);
  const structure = quadSet(rows + cols + 1);
  const frames = quadSet(cols * rows * 2);
  const left = -cols / 2;
  const paneWidth = (PANE.width - 0.1) / 2;

  for (let row = 0; row < rows; row++) {
    const y = (row + 0.5) * PITCH.y;
    const cityGlow = 0.014 * Math.exp(-y / 38);
    for (let col = 0; col < cols; col++) {
      const x = (left + col + 0.5) * PITCH.x;
      const id = seed * 100003 + row * 977 + col;
      pushQuad(frames, x, y, PANE.width + 0.3, PANE.height + 0.3, 0.0105, 0.0105, 0.0115);
      pushQuad(frames, x, y - PANE.height / 2 - 0.2, PANE.width + 0.55, 0.1, 0.024, 0.024, 0.026);
      if (skip && skip.col === col && skip.row === row) continue;
      const reflect = 0.0045 + 0.012 * Math.pow(rand(id), 1.7) + cityGlow * (0.5 + rand(id + 1));
      pushQuad(panes, x - paneWidth / 2 - 0.05, y, paneWidth, PANE.height, reflect, reflect, reflect * 1.03);
      pushQuad(panes, x + paneWidth / 2 + 0.05, y, paneWidth, PANE.height, reflect * 0.9, reflect * 0.9, reflect * 0.93);
      if (rand(id + 2) < 0.1) {
        const drop = 0.35 + 0.6 * rand(id + 3);
        const shade = 0.012 + 0.012 * rand(id + 4);
        pushQuad(blinds, x, y + PANE.height / 2 - (PANE.height * drop) / 2, PANE.width, PANE.height * drop, shade, shade, shade);
      }
    }
    pushQuad(structure, 0, row * PITCH.y + 0.1, cols * PITCH.x, 0.16, 0.0085, 0.0085, 0.0095);
  }

  const height = rows * PITCH.y;
  for (let col = 0; col <= cols; col++) {
    if (col % 4 !== 0 && col !== cols) continue;
    const x = (left + col) * PITCH.x;
    const edge = col === 0 || col === cols;
    const value = edge ? 0.03 : 0.0075;
    pushQuad(structure, x, height / 2, edge ? 0.34 : 0.55, height, value, value, value * 1.1);
  }

  return { panes: trim(panes), blinds: trim(blinds), structure: trim(structure), frames: trim(frames) };
};
