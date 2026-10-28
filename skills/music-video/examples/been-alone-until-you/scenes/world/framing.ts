import { HEIGHT } from "../../config";
import { curve } from "../../lib/song";
import type { Vec3 } from "./layout";

export const FOV = 40;

const HALF_FOV_TAN = Math.tan((FOV * Math.PI) / 360);

export const aimTarget = (camera: Vec3, subject: Vec3, screenY: number): Vec3 => {
  const dx = subject[0] - camera[0];
  const dy = subject[1] - camera[1];
  const dz = subject[2] - camera[2];
  const yaw = Math.atan2(dx, -dz);
  const pitch = Math.atan2(dy, Math.hypot(dx, dz)) + Math.atan(((screenY - HEIGHT / 2) / (HEIGHT / 2)) * HALF_FOV_TAN);
  const reach = Math.hypot(dx, dy, dz);
  return [
    camera[0] + Math.sin(yaw) * Math.cos(pitch) * reach,
    camera[1] + Math.sin(pitch) * reach,
    camera[2] - Math.cos(yaw) * Math.cos(pitch) * reach,
  ];
};

export const bassLevel = (t: number) => (curve("low", t) + curve("low", t - 0.04) + curve("low", t - 0.08)) / 3;
