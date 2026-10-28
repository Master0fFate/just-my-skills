import { useLayoutEffect, useMemo, useRef } from "react";
import { AdditiveBlending, Color, InstancedBufferAttribute, PlaneGeometry, type InstancedMesh } from "three";
import { color } from "../../config";
import { rand } from "../../lib/motion";
import { LAYER, LIT_CELL, MAIN_TOWER, PANE, PITCH, windowCenter } from "./layout";
import { litPane, softGlow } from "./textures";

const quad = new PlaneGeometry(1, 1);

const HUES = [color.warm, color.warm, color.warm, color.accentHi, color.paper];
const COLS_BEFORE = 14;
const COLS_AFTER = 11;
const ROWS_BEFORE = 18;
const ROWS_AFTER = 22;
const CHANCE = 0.075;
const RING_WIDTH = 4.6;
const SETTLED = 0.42;

type Sleeper = { x: number; y: number; ring: number; hue: Color };

const sleepers = (): Sleeper[] => {
  const found: Sleeper[] = [];
  for (let col = LIT_CELL.col - COLS_BEFORE; col <= LIT_CELL.col + COLS_AFTER; col++) {
    for (let row = Math.max(0, LIT_CELL.row - ROWS_BEFORE); row <= LIT_CELL.row + ROWS_AFTER; row++) {
      if (col < 0 || col >= MAIN_TOWER.cols || (col === LIT_CELL.col && row === LIT_CELL.row)) continue;
      const id = col * 131 + row * 17 + 5000;
      if (rand(id) > CHANCE) continue;
      const [x, y] = windowCenter(MAIN_TOWER, { col, row });
      const reach = Math.hypot((col - LIT_CELL.col) * PITCH.x, (row - LIT_CELL.row) * PITCH.y);
      found.push({ x, y, ring: Math.floor(reach / RING_WIDTH), hue: new Color(HUES[Math.floor(rand(id + 1) * HUES.length)]) });
    }
  }
  return found;
};

type WakeProps = { t: number; ringTimes: number[]; calm: number };

export const Wake = ({ t, ringTimes, calm }: WakeProps) => {
  const crowd = useMemo(sleepers, []);
  const panes = useRef<InstancedMesh>(null);
  const glows = useRef<InstancedMesh>(null);
  const paneColors = useMemo(() => new Float32Array(crowd.length * 3), [crowd]);
  const glowColors = useMemo(() => new Float32Array(crowd.length * 3), [crowd]);

  useLayoutEffect(() => {
    const paneMesh = panes.current!;
    const glowMesh = glows.current!;
    crowd.forEach((sleeper, i) => {
      const paneAt = i * 16;
      paneMesh.instanceMatrix.array.set([PANE.width * 0.96, 0, 0, 0, 0, PANE.height * 0.96, 0, 0, 0, 0, 1, 0, sleeper.x, sleeper.y, 0, 1], paneAt);
      glowMesh.instanceMatrix.array.set([5, 0, 0, 0, 0, 6.2, 0, 0, 0, 0, 1, 0, sleeper.x, sleeper.y, 0, 1], paneAt);
    });
    paneMesh.instanceMatrix.needsUpdate = true;
    glowMesh.instanceMatrix.needsUpdate = true;
    paneMesh.instanceColor = new InstancedBufferAttribute(paneColors, 3);
    glowMesh.instanceColor = new InstancedBufferAttribute(glowColors, 3);
  }, [crowd]);

  useLayoutEffect(() => {
    crowd.forEach((sleeper, i) => {
      const since = t - ringTimes[Math.min(sleeper.ring, ringTimes.length - 1)];
      const flash = since < 0 ? 0 : Math.exp(-since * 7) + SETTLED * (1 - Math.exp(-since * 18));
      const level = flash * calm;
      paneColors[i * 3] = sleeper.hue.r * level;
      paneColors[i * 3 + 1] = sleeper.hue.g * level;
      paneColors[i * 3 + 2] = sleeper.hue.b * level;
      glowColors[i * 3] = sleeper.hue.r * level * 0.34;
      glowColors[i * 3 + 1] = sleeper.hue.g * level * 0.34;
      glowColors[i * 3 + 2] = sleeper.hue.b * level * 0.34;
    });
    panes.current!.instanceColor!.needsUpdate = true;
    glows.current!.instanceColor!.needsUpdate = true;
  });

  return (
    <>
      <instancedMesh ref={panes} args={[quad, undefined, crowd.length]} position={[0, 0, LAYER.blind + 0.004]} frustumCulled={false} renderOrder={4}>
        <meshBasicMaterial map={litPane()} blending={AdditiveBlending} transparent depthWrite={false} fog={false} />
      </instancedMesh>
      <instancedMesh ref={glows} args={[quad, undefined, crowd.length]} position={[0, 0, LAYER.glow]} frustumCulled={false} renderOrder={5}>
        <meshBasicMaterial map={softGlow()} blending={AdditiveBlending} transparent depthWrite={false} fog={false} />
      </instancedMesh>
    </>
  );
};
