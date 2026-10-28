const FRAMES = { "9:16": [1080, 1920], "16:9": [1920, 1080], "1:1": [1080, 1080], "4:5": [1080, 1350] } as const;

export const meta = { title: "Untitled", artist: "Artist" } as const;
export const AUDIO = "song.mp3";
export const ASPECT: keyof typeof FRAMES = "9:16";
export const FPS = 60;
export const HUD = true;

const ACCENT = "#6666ff";
const WARM = "#ffb36b";

const shade = (hex: string, target: number, amount: number) =>
  `#${[1, 3, 5]
    .map((i) => Math.round(parseInt(hex.slice(i, i + 2), 16) + (target - parseInt(hex.slice(i, i + 2), 16)) * amount))
    .map((v) => v.toString(16).padStart(2, "0"))
    .join("")}`;

export const [WIDTH, HEIGHT] = FRAMES[ASPECT];
export const VERTICAL = HEIGHT > WIDTH;

const feedBand = Math.min(HEIGHT, WIDTH * 1.25);

export const SAFE = VERTICAL
  ? { top: Math.max(72, Math.round((HEIGHT - feedBand) / 2)), bottom: Math.min(HEIGHT - 72, Math.round((HEIGHT + feedBand) / 2)), side: 72 }
  : { top: 72, bottom: HEIGHT - 72, side: 96 };

export const color = {
  ink: "#07070b",
  night: "#0e0e18",
  paper: "#f2f1ee",
  ash: "#8b8b98",
  smoke: "#3a3a46",
  accent: ACCENT,
  accentHi: shade(ACCENT, 255, 0.4),
  accentDeep: shade(ACCENT, 0, 0.5),
  warm: WARM,
} as const;

export const font = {
  display: "'Archivo Variable', sans-serif",
  serif: "'Instrument Serif', serif",
  mono: "'JetBrains Mono Variable', monospace",
} as const;
