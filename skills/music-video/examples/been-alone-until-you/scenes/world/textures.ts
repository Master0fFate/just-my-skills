import { CanvasTexture, LinearFilter, SRGBColorSpace } from "three";
import { rand } from "../../lib/motion";

const cache = new Map<string, CanvasTexture>();

const paint = (key: string, width: number, height: number, draw: (context: CanvasRenderingContext2D) => void) => {
  const cached = cache.get(key);
  if (cached) return cached;
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  draw(canvas.getContext("2d")!);
  const texture = new CanvasTexture(canvas);
  texture.colorSpace = SRGBColorSpace;
  texture.minFilter = LinearFilter;
  texture.generateMipmaps = false;
  cache.set(key, texture);
  return texture;
};

const shade = (key: string, width: number, height: number, intensity: (x: number, y: number) => number) =>
  paint(key, width, height, (context) => {
    const image = context.createImageData(width, height);
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const value = Math.round(255 * Math.min(1, Math.max(0, intensity((x + 0.5) / width, (y + 0.5) / height))));
        const at = (y * width + x) * 4;
        image.data[at] = value;
        image.data[at + 1] = value;
        image.data[at + 2] = value;
        image.data[at + 3] = 255;
      }
    }
    context.putImageData(image, 0, 0);
  });

export const softGlow = () =>
  shade("soft-glow", 256, 256, (u, v) => {
    const r = Math.hypot(u * 2 - 1, v * 2 - 1);
    return r >= 1 ? 0 : Math.pow(1 - r, 3) * (0.3 + 0.7 * Math.exp(-r * 7));
  });

export const streakGlow = () =>
  shade("streak-glow", 512, 32, (u, v) => {
    const x = Math.abs(u * 2 - 1);
    const y = Math.abs(v * 2 - 1);
    return Math.pow(1 - x, 2.4) * Math.exp(-y * y * 26);
  });

export const ringGlow = () =>
  shade("ring-glow", 256, 256, (u, v) => {
    const r = Math.hypot(u * 2 - 1, v * 2 - 1);
    const offset = (r - 0.82) / 0.07;
    return Math.exp(-offset * offset * 7) * (1 - Math.max(0, r - 0.9) * 10);
  });

export const glassReflection = () =>
  shade("glass", 64, 96, (u, v) => {
    const diagonal = (u + v * 0.55) % 1;
    const streak = Math.exp(-Math.pow((diagonal - 0.62) / 0.14, 2));
    return 0.55 + 0.3 * (1 - v) + 0.5 * streak;
  });

export const concrete = () =>
  shade("concrete", 256, 256, (u, v) => {
    const grain = 0.82 + 0.18 * rand(Math.floor(u * 256) * 977 + Math.floor(v * 256));
    const stain = 0.86 + 0.14 * Math.sin(u * 37 + Math.sin(v * 6 + u * 9) * 2.2);
    const lintel = 0.55 + 0.45 * Math.min(1, v * 7);
    const sill = 0.8 + 0.2 * Math.min(1, (1 - v) * 9);
    return grain * stain * lintel * sill;
  });

export const blindStripes = () =>
  shade("blinds", 16, 64, (_, v) => (Math.floor(v * 16) % 2 === 0 ? 1 : 0.38));

export const litPane = () =>
  paint("lit-pane", 128, 192, (context) => {
    const gradient = context.createRadialGradient(64, 70, 4, 64, 96, 120);
    gradient.addColorStop(0, "#ffffff");
    gradient.addColorStop(1, "#7d7d86");
    context.fillStyle = gradient;
    context.fillRect(0, 0, 128, 192);
    context.fillStyle = "#101016";
    context.fillRect(61, 0, 6, 192);
    context.fillRect(0, 68, 128, 5);
    context.lineWidth = 8;
    context.strokeStyle = "#101016";
    context.strokeRect(0, 0, 128, 192);
  });

export const roomInterior = () =>
  paint("room", 512, 768, (context) => {
    const width = 512;
    const height = 768;
    const wall = context.createLinearGradient(0, 0, 0, height);
    wall.addColorStop(0, "#fbfbf9");
    wall.addColorStop(0.7, "#d9d9dd");
    wall.addColorStop(1, "#a4a4ac");
    context.fillStyle = wall;
    context.fillRect(0, 0, width, height);

    const floor = context.createLinearGradient(0, height * 0.72, 0, height);
    floor.addColorStop(0, "#8c8c95");
    floor.addColorStop(1, "#52525c");
    context.fillStyle = floor;
    context.fillRect(0, height * 0.72, width, height * 0.28);
    context.fillStyle = "rgba(20,20,28,0.32)";
    context.fillRect(0, height * 0.715, width, 6);

    const pool = context.createRadialGradient(width * 0.5, height * 0.3, 0, width * 0.5, height * 0.3, height * 0.62);
    pool.addColorStop(0, "rgba(255,255,255,0.95)");
    pool.addColorStop(1, "rgba(255,255,255,0)");
    context.fillStyle = pool;
    context.fillRect(0, 0, width, height);

    context.strokeStyle = "#1c1c24";
    context.lineWidth = 3;
    context.beginPath();
    context.moveTo(width * 0.5, 0);
    context.lineTo(width * 0.5, height * 0.2);
    context.stroke();
    context.fillStyle = "#ffffff";
    context.beginPath();
    context.arc(width * 0.5, height * 0.215, 13, 0, Math.PI * 2);
    context.fill();

    const chairX = width * 0.74;
    const floorY = height * 0.845;
    const seatY = height * 0.745;
    const backTop = height * 0.575;
    const shadow = context.createRadialGradient(chairX, floorY, 0, chairX, floorY, 120);
    shadow.addColorStop(0, "rgba(10,10,16,0.6)");
    shadow.addColorStop(1, "rgba(10,10,16,0)");
    context.save();
    context.translate(0, floorY * 0.5);
    context.scale(1, 0.5);
    context.fillStyle = shadow;
    context.fillRect(chairX - 140, floorY - 120, 280, 240);
    context.restore();

    context.fillStyle = "#2a2a33";
    context.fillRect(chairX - 44, seatY + 16, 7, floorY - 22 - seatY - 16);
    context.fillRect(chairX + 37, seatY + 16, 7, floorY - 22 - seatY - 16);
    context.fillStyle = "#101016";
    context.fillRect(chairX - 58, backTop, 10, seatY - backTop);
    context.fillRect(chairX + 48, backTop, 10, seatY - backTop);
    context.fillRect(chairX - 58, backTop, 116, 14);
    context.fillRect(chairX - 58, backTop + 52, 116, 8);
    for (const offset of [-28, 0, 28]) context.fillRect(chairX + offset - 3, backTop + 14, 6, 38);
    context.fillRect(chairX - 68, seatY, 136, 17);
    context.fillRect(chairX - 62, seatY + 17, 10, floorY - seatY - 17);
    context.fillRect(chairX + 52, seatY + 17, 10, floorY - seatY - 17);

    const curtain = context.createLinearGradient(0, 0, width * 0.22, 0);
    curtain.addColorStop(0, "rgba(10,10,16,0.7)");
    curtain.addColorStop(1, "rgba(10,10,16,0)");
    context.fillStyle = curtain;
    context.fillRect(0, 0, width * 0.22, height);

    const edge = context.createRadialGradient(width / 2, height / 2, height * 0.35, width / 2, height / 2, height * 0.72);
    edge.addColorStop(0, "rgba(0,0,0,0)");
    edge.addColorStop(1, "rgba(0,0,0,0.5)");
    context.fillStyle = edge;
    context.fillRect(0, 0, width, height);

    context.fillStyle = "#0d0d13";
    context.fillRect(width / 2 - 6, 0, 12, height);
    context.fillRect(0, height * 0.36 - 5, width, 10);
    context.lineWidth = 16;
    context.strokeStyle = "#0d0d13";
    context.strokeRect(0, 0, width, height);
  });
