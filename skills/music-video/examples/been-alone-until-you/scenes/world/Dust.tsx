import { useLayoutEffect, useMemo } from "react";
import { AdditiveBlending, BufferGeometry, Color, Float32BufferAttribute, ShaderMaterial } from "three";
import { HEIGHT } from "../../config";
import { rand } from "../../lib/motion";
import type { Vec3 } from "./layout";

type DustLight = { position: Vec3; color: string; reach: number };

type DustProps = {
  t: number;
  count: number;
  box: Vec3;
  center?: Vec3;
  drift?: Vec3;
  size?: number;
  base?: number;
  span?: number;
  fov?: number;
  seed?: number;
  lights: [DustLight, DustLight];
};

const vertexShader = `
uniform float uTime;
uniform float uScale;
uniform float uSize;
uniform float uBase;
uniform float uSpan;
uniform vec3 uBox;
uniform vec3 uCenter;
uniform vec3 uDrift;
uniform vec3 uPosA;
uniform vec3 uPosB;
uniform vec3 uColorA;
uniform vec3 uColorB;
attribute vec4 aSeed;
varying vec3 vColor;
void main() {
  vec3 p = position * uBox + uDrift * uTime;
  p += vec3(sin(uTime * 0.35 + aSeed.x * 6.283), cos(uTime * 0.29 + aSeed.y * 6.283), sin(uTime * 0.23 + aSeed.z * 6.283)) * 0.35;
  p = mod(p + uBox * 0.5, uBox) - uBox * 0.5;
  vec3 edge = abs(p / uBox) * 2.0;
  float fade = 1.0 - smoothstep(0.72, 1.0, max(edge.x, max(edge.y, edge.z)));
  vec3 world = p + uCenter;
  vec3 da = world - uPosA;
  vec3 db = world - uPosB;
  float lit = 1.0 / (1.0 + dot(da, da) / (uSpan * uSpan));
  float litB = 1.0 / (1.0 + dot(db, db) / (uSpan * uSpan));
  vColor = (uColorA * lit + uColorB * litB + vec3(uBase)) * fade * (0.35 + 0.65 * aSeed.w);
  vec4 view = viewMatrix * vec4(world, 1.0);
  gl_PointSize = uSize * (0.5 + aSeed.w) * uScale / -view.z;
  gl_Position = projectionMatrix * view;
}
`;

const fragmentShader = `
varying vec3 vColor;
void main() {
  float d = length(gl_PointCoord - 0.5);
  float a = smoothstep(0.5, 0.05, d);
  gl_FragColor = vec4(vColor, a);
}
`;

const scatter = (count: number, seed: number) => {
  const positions = new Float32Array(count * 3);
  const seeds = new Float32Array(count * 4);
  for (let i = 0; i < count; i++) {
    for (let k = 0; k < 3; k++) positions[i * 3 + k] = rand(seed * 977 + i * 5 + k) - 0.5;
    for (let k = 0; k < 4; k++) seeds[i * 4 + k] = rand(seed * 331 + i * 7 + k + 1000);
  }
  const geometry = new BufferGeometry();
  geometry.setAttribute("position", new Float32BufferAttribute(positions, 3));
  geometry.setAttribute("aSeed", new Float32BufferAttribute(seeds, 4));
  return geometry;
};

export const Dust = ({ t, count, box, center = [0, 0, 0], drift = [0, 0.12, 0], size = 0.05, base = 0.02, span = 3, fov = 40, seed = 1, lights }: DustProps) => {
  const geometry = useMemo(() => scatter(count, seed), [count, seed]);
  const material = useMemo(
    () =>
      new ShaderMaterial({
        vertexShader,
        fragmentShader,
        transparent: true,
        depthWrite: false,
        blending: AdditiveBlending,
        uniforms: {
          uTime: { value: 0 },
          uScale: { value: HEIGHT / (2 * Math.tan((fov * Math.PI) / 360)) },
          uSize: { value: size },
          uBase: { value: base },
          uSpan: { value: span },
          uBox: { value: box },
          uCenter: { value: center },
          uDrift: { value: drift },
          uPosA: { value: lights[0].position },
          uPosB: { value: lights[1].position },
          uColorA: { value: new Color(lights[0].color) },
          uColorB: { value: new Color(lights[1].color) },
        },
      }),
    [],
  );
  useLayoutEffect(() => {
    const u = material.uniforms;
    u.uTime.value = t;
    u.uBox.value = box;
    u.uCenter.value = center;
    u.uDrift.value = drift;
    u.uSize.value = size;
    u.uBase.value = base;
    u.uSpan.value = span;
    u.uPosA.value = lights[0].position;
    u.uPosB.value = lights[1].position;
    u.uColorA.value.set(lights[0].color).multiplyScalar(lights[0].reach);
    u.uColorB.value.set(lights[1].color).multiplyScalar(lights[1].reach);
  });
  return <points geometry={geometry} material={material} frustumCulled={false} renderOrder={4} />;
};
