import { useLayoutEffect, useMemo } from "react";
import { AdditiveBlending, BufferGeometry, Color, Float32BufferAttribute, ShaderMaterial } from "three";
import { color, HEIGHT } from "../../config";
import { Glow } from "./Glow";
import type { Vec3 } from "./layout";

export type Orbit = { angle: number; radius: number };

export type Placement = { tilt: number; yaw: number; center: Vec3 };

type LightPair = { white: Vec3; violet: Vec3 };

const WHITE_SHARE = 0.46;
const VIOLET_SHARE = 0.54;
const TRAIL_SAMPLES = 140;
const RING_SEGMENTS = 160;

const place = (angle: number, radius: number, { tilt, yaw, center }: Placement): Vec3 => {
  const x = Math.cos(angle) * radius;
  const y = Math.sin(angle) * radius;
  const tiltedY = y * Math.cos(tilt);
  const tiltedZ = y * Math.sin(tilt);
  return [
    center[0] + x * Math.cos(yaw) + tiltedZ * Math.sin(yaw),
    center[1] + tiltedY,
    center[2] - x * Math.sin(yaw) + tiltedZ * Math.cos(yaw),
  ];
};

export const lightPair = (orbit: Orbit, placement: Placement): LightPair => ({
  white: place(orbit.angle, orbit.radius * WHITE_SHARE, placement),
  violet: place(orbit.angle + Math.PI, orbit.radius * VIOLET_SHARE, placement),
});

type OrbProps = { position: Vec3; tint: string; hot: string; size: number; level: number };

const Orb = ({ position, tint, hot, size, level }: OrbProps) => (
  <>
    <Glow position={position} size={size * 0.8} color={hot} opacity={level} />
    <Glow position={position} size={size * 2.2} color={hot} opacity={0.7 * level} />
    <Glow position={position} size={size * 6} color={tint} opacity={0.5 * level} />
    <Glow position={position} size={size * 16} color={tint} opacity={0.2 * level} />
    <Glow position={position} size={size * 42} color={tint} opacity={0.07 * level} />
  </>
);

const trailVertex = `
uniform float uScale;
uniform float uSize;
attribute float aFade;
varying float vFade;
void main() {
  vFade = aFade;
  vec4 view = modelViewMatrix * vec4(position, 1.0);
  gl_PointSize = uSize * mix(0.12, 1.0, pow(aFade, 0.7)) * uScale / -view.z;
  gl_Position = projectionMatrix * view;
}
`;

const trailFragment = `
uniform vec3 uColor;
uniform float uAlpha;
varying float vFade;
void main() {
  float d = length(gl_PointCoord - 0.5);
  float a = smoothstep(0.5, 0.0, d);
  gl_FragColor = vec4(uColor, a * a * pow(vFade, 1.8) * uAlpha);
}
`;

type TrailProps = {
  t: number;
  seconds: number;
  positionAt: (time: number) => Vec3;
  tint: string;
  size: number;
  alpha: number;
  fov: number;
};

const Trail = ({ t, seconds, positionAt, tint, size, alpha, fov }: TrailProps) => {
  const geometry = useMemo(() => {
    const result = new BufferGeometry();
    result.setAttribute("position", new Float32BufferAttribute(new Float32Array(TRAIL_SAMPLES * 3), 3));
    result.setAttribute("aFade", new Float32BufferAttribute(Float32Array.from({ length: TRAIL_SAMPLES }, (_, k) => 1 - k / TRAIL_SAMPLES), 1));
    return result;
  }, []);
  const material = useMemo(
    () =>
      new ShaderMaterial({
        vertexShader: trailVertex,
        fragmentShader: trailFragment,
        transparent: true,
        depthWrite: false,
        depthTest: false,
        blending: AdditiveBlending,
        uniforms: {
          uScale: { value: HEIGHT / (2 * Math.tan((fov * Math.PI) / 360)) },
          uSize: { value: size },
          uColor: { value: new Color(tint) },
          uAlpha: { value: alpha },
        },
      }),
    [],
  );
  useLayoutEffect(() => {
    const attribute = geometry.getAttribute("position") as Float32BufferAttribute;
    for (let k = 0; k < TRAIL_SAMPLES; k++) {
      const [x, y, z] = positionAt(t - (seconds * k) / TRAIL_SAMPLES);
      attribute.setXYZ(k, x, y, z);
    }
    attribute.needsUpdate = true;
    material.uniforms.uSize.value = size;
    material.uniforms.uAlpha.value = alpha;
  });
  return <points geometry={geometry} material={material} frustumCulled={false} renderOrder={6} />;
};

const ringPoints = Float32Array.from({ length: RING_SEGMENTS * 3 }, (_, i) => {
  const angle = (Math.floor(i / 3) / RING_SEGMENTS) * Math.PI * 2;
  return [Math.cos(angle), Math.sin(angle), 0][i % 3];
});

const Ring = ({ placement, radius, opacity }: { placement: Placement; radius: number; opacity: number }) => {
  const geometry = useMemo(() => {
    const result = new BufferGeometry();
    result.setAttribute("position", new Float32BufferAttribute(ringPoints, 3));
    return result;
  }, []);
  return (
    <group position={placement.center} rotation={[placement.tilt, placement.yaw, 0, "YXZ"]} scale={[radius, radius, radius]}>
      <lineLoop geometry={geometry}>
        <lineBasicMaterial color={color.ash} transparent opacity={opacity} depthWrite={false} />
      </lineLoop>
    </group>
  );
};

type TwoLightsProps = {
  t: number;
  orbit: (time: number) => Orbit;
  placement: Placement;
  fov?: number;
  size?: number;
  level?: number;
  trailSeconds?: number;
  trailSize?: number;
  rings?: number;
};

export const TwoLights = ({
  t,
  orbit,
  placement,
  fov = 40,
  size = 0.5,
  level = 1,
  trailSeconds = 0,
  trailSize = 0.32,
  rings = 0,
}: TwoLightsProps) => {
  const now = orbit(t);
  const pair = lightPair(now, placement);
  return (
    <>
      {rings > 0 && <Ring placement={placement} radius={now.radius * WHITE_SHARE} opacity={rings} />}
      {rings > 0 && <Ring placement={placement} radius={now.radius * VIOLET_SHARE} opacity={rings} />}
      {trailSeconds > 0 && (
        <>
          <Trail t={t} seconds={trailSeconds} positionAt={(time) => lightPair(orbit(time), placement).white} tint={color.paper} size={trailSize * size} alpha={0.55 * level} fov={fov} />
          <Trail t={t} seconds={trailSeconds} positionAt={(time) => lightPair(orbit(time), placement).violet} tint={color.accent} size={trailSize * size} alpha={0.75 * level} fov={fov} />
        </>
      )}
      <Orb position={pair.white} tint={color.paper} hot="#ffffff" size={size} level={level} />
      <Orb position={pair.violet} tint={color.accent} hot={color.accentHi} size={size * 1.12} level={level} />
    </>
  );
};
