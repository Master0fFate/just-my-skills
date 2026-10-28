import { useLayoutEffect, useMemo } from "react";
import * as THREE from "three";
import { Stage3D } from "../../components/Stage3D";
import { color, HEIGHT } from "../../config";
import { useTime } from "../../lib/clock";
import { noise, rand } from "../../lib/motion";
import { barAt, beatAt, pulse } from "../../lib/song";
import { toRgb } from "./fx";
import type { Look } from "./theme";

const FOV = 40;
const TRAIL = 64;
const TRAIL_STEP = 0.012;
const RING = 180;
const BRIDGE = 14;
const GLOWS = 4;
const MAX_PARTICLES = 520;
const CAPACITY = GLOWS * 2 + TRAIL * 2 + RING * 2 + BRIDGE + MAX_PARTICLES;

const WHITE = toRgb(color.paper);
const INK = toRgb(color.ink);
const VIOLET = toRgb(color.accent);
const VIOLET_HI = toRgb(color.accentHi);
const AMBER = toRgb(color.warm);

const uniforms = { uScale: { value: HEIGHT / (2 * Math.tan((FOV * Math.PI) / 360)) } };

const vertexShader = `
attribute float size;
attribute vec4 tint;
uniform float uScale;
varying vec4 vTint;
void main() {
  vec4 view = modelViewMatrix * vec4(position, 1.0);
  vTint = tint;
  gl_PointSize = max(1.0, size * uScale / -view.z);
  gl_Position = projectionMatrix * view;
}
`;

const fragmentShader = `
varying vec4 vTint;
void main() {
  float d = length(gl_PointCoord - 0.5) * 2.0;
  float falloff = pow(clamp(1.0 - d, 0.0, 1.0), 2.2);
  gl_FragColor = vec4(vTint.rgb, vTint.a * falloff);
}
`;

type Rgb = readonly [number, number, number];
type Vec = [number, number, number];

const createField = () => {
  const position = new Float32Array(CAPACITY * 3);
  const size = new Float32Array(CAPACITY);
  const tint = new Float32Array(CAPACITY * 4);
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.BufferAttribute(position, 3).setUsage(THREE.DynamicDrawUsage));
  geometry.setAttribute("size", new THREE.BufferAttribute(size, 1).setUsage(THREE.DynamicDrawUsage));
  geometry.setAttribute("tint", new THREE.BufferAttribute(tint, 4).setUsage(THREE.DynamicDrawUsage));
  return { position, size, tint, geometry };
};

const orbitState = (t: number, speed: number) => {
  const beat = pulse(t, 6);
  const angle = t * 1.65 * speed + Math.sin(t * 0.7) * 0.35;
  const spread = 1 + 0.2 * beat;
  const cx = noise(t * 0.35, 1) * 0.6;
  const cy = noise(t * 0.3, 2) * 0.6;
  const cz = noise(t * 0.25, 3) * 0.8;
  const phase = Math.sin(t * 0.5) * 0.3;
  const place = (theta: number): Vec => [
    cx + Math.cos(theta) * 1.9 * spread,
    cy + Math.sin(theta) * 3 * spread,
    cz + Math.sin(theta) * 2.2,
  ];
  return { white: place(angle), violet: place(angle + Math.PI + phase), center: [cx, cy, cz] as Vec };
};

const fillField = (field: ReturnType<typeof createField>, t: number, look: Look, gain: number) => {
  const { theme, palette } = look;
  const { position, size, tint, geometry } = field;
  let count = 0;
  const add = (point: readonly number[], diameter: number, rgb: Rgb, alpha: number) => {
    const i = count++;
    position[i * 3] = point[0];
    position[i * 3 + 1] = point[1];
    position[i * 3 + 2] = point[2];
    size[i] = diameter;
    tint[i * 4] = rgb[0];
    tint[i * 4 + 1] = rgb[1];
    tint[i * 4 + 2] = rgb[2];
    tint[i * 4 + 3] = Math.min(1, alpha * gain);
  };

  const light = palette.inverted ? INK : WHITE;
  const lightTrail = theme.warm && !palette.inverted ? AMBER : light;
  const hit = pulse(t, 6);
  const now = orbitState(t, theme.orbit);

  const drawOrb = (point: Vec, rgb: Rgb, core: Rgb) => {
    add(point, 4.2 + hit * 1.6, rgb, 0.1);
    add(point, 2.4 + hit * 1.2, rgb, 0.26);
    add(point, 1.2 + hit * 0.5, rgb, 0.6);
    add(point, 0.5 + hit * 0.25, core, 1);
  };
  drawOrb(now.white, theme.warm && !palette.inverted ? AMBER : light, light);
  drawOrb(now.violet, VIOLET, VIOLET_HI);

  const drawTrail = (pick: "white" | "violet", rgb: Rgb) => {
    for (let k = 1; k <= TRAIL; k++) {
      const fade = 1 - k / TRAIL;
      add(orbitState(t - k * TRAIL_STEP, theme.orbit)[pick], 0.55 * Math.pow(fade, 1.1), rgb, 0.85 * Math.pow(fade, 1.5));
    }
  };
  drawTrail("white", lightTrail);
  drawTrail("violet", VIOLET);

  const barHit = barAt(t);
  const shock = (since: number, strength: number, rgb: Rgb) => {
    const radius = 0.4 + 6.5 * (1 - Math.exp(-since * 4));
    const alpha = strength * Math.exp(-since * 3.2);
    for (let k = 0; k < RING; k++) {
      const angle = (k / RING) * Math.PI * 2;
      add([now.center[0] + Math.cos(angle) * radius, now.center[1] + Math.sin(angle) * radius * 1.35, now.center[2]], 0.34, rgb, alpha * 0.45);
    }
  };
  shock(beatAt(t).since, 0.7, light);
  shock(barHit.since, 0.9, VIOLET);

  for (let k = 0; k < BRIDGE; k++) {
    const u = (k + 0.5) / BRIDGE;
    const sag = Math.sin(u * Math.PI) * (0.3 + hit) * Math.sin(t * 9 + k);
    add(
      [now.white[0] + (now.violet[0] - now.white[0]) * u + sag, now.white[1] + (now.violet[1] - now.white[1]) * u, now.white[2] + (now.violet[2] - now.white[2]) * u],
      0.09,
      VIOLET_HI,
      0.2 + 0.6 * hit,
    );
  }

  const beatIndex = beatAt(t).index;
  const particles = Math.min(MAX_PARTICLES, theme.particles);
  for (let i = 0; i < particles; i++) {
    const depth = rand(i * 5 + 1);
    const spin = rand(i * 5 + 2);
    const mood = rand(i * 5 + 3);
    const height = rand(i * 5 + 4);
    const radius = (1.2 + 6.5 * Math.pow(depth, 1.3)) * (1 + 0.3 * hit);
    const angle = spin * Math.PI * 2 + t * (0.12 + 0.4 * mood) * (i % 2 ? 1 : -1) * theme.orbit;
    const lift = (height * 14 + t * (0.3 + mood * 0.5) * theme.orbit) % 14;
    const sparkle = rand(i * 977 + beatIndex * 131) > 0.9 ? 2.2 : 1;
    const rgb = mood < 0.45 ? light : mood < 0.8 ? VIOLET : theme.warm && !palette.inverted ? AMBER : light;
    add(
      [Math.cos(angle) * radius, lift - 7, Math.sin(angle) * radius * 0.8 - 1],
      (0.05 + 0.1 * mood) * (0.7 + 1.5 * hit) * sparkle,
      rgb,
      (0.3 + 0.5 * spin) * (sparkle > 1 ? 1 : 0.8),
    );
  }

  geometry.setDrawRange(0, count);
  geometry.attributes.position.needsUpdate = true;
  geometry.attributes.size.needsUpdate = true;
  geometry.attributes.tint.needsUpdate = true;
};

const LightField = ({ look, gain }: { look: Look; gain: number }) => {
  const t = useTime();
  const field = useMemo(createField, []);
  useLayoutEffect(() => {
    fillField(field, t, look, gain);
  });
  const { camera } = look.theme;
  return (
    <group
      rotation={[Math.sin(t * 0.31) * 0.1 * camera, Math.sin(t * 0.42 * camera) * 0.22, noise(t * 0.5, 4) * 0.03 * camera]}
      scale={1 + 0.04 * pulse(t, 6) * camera}
    >
      <points geometry={field.geometry} frustumCulled={false}>
        <shaderMaterial
          uniforms={uniforms}
          vertexShader={vertexShader}
          fragmentShader={fragmentShader}
          transparent
          depthWrite={false}
          blending={look.palette.inverted ? THREE.NormalBlending : THREE.AdditiveBlending}
        />
      </points>
    </group>
  );
};

export const TwoLights3D = ({ look, gain = 1 }: { look: Look; gain?: number }) => (
  <Stage3D camera={{ fov: FOV, position: [0, 0, 12] }}>
    <LightField look={look} gain={gain} />
  </Stage3D>
);
