import { useLayoutEffect, useMemo, useRef } from "react";
import { InstancedBufferAttribute, PlaneGeometry, type InstancedMesh, type Texture } from "three";
import { buildFace, LAYER, LIT_CELL, MAIN_TOWER, NEIGHBOURS, PITCH, type Cell, type QuadSet, type TowerSpec, type Vec3 } from "./layout";
import { blindStripes, concrete, glassReflection } from "./textures";

const quad = new PlaneGeometry(1, 1);

const WALL = "#050507";

const Quads = ({ data, map, z }: { data: QuadSet; map?: Texture; z: number }) => {
  const mesh = useRef<InstancedMesh>(null);
  useLayoutEffect(() => {
    const target = mesh.current!;
    target.instanceMatrix.set(data.matrices);
    target.instanceMatrix.needsUpdate = true;
    target.instanceColor = new InstancedBufferAttribute(data.colors, 3);
  }, [data]);
  return (
    <instancedMesh ref={mesh} args={[quad, undefined, data.count]} position={[0, 0, z]} frustumCulled={false}>
      <meshBasicMaterial map={map} />
    </instancedMesh>
  );
};

type FaceProps = { cols: number; rows: number; seed: number; skip?: Cell; position: Vec3; rotationY: number };

const Face = ({ cols, rows, seed, skip, position, rotationY }: FaceProps) => {
  const data = useMemo(() => buildFace(cols, rows, seed, skip), [cols, rows, seed, skip?.col, skip?.row]);
  return (
    <group position={position} rotation={[0, rotationY, 0]}>
      <Quads data={data.structure} z={LAYER.structure} />
      <Quads data={data.frames} map={concrete()} z={LAYER.frame} />
      <Quads data={data.panes} map={glassReflection()} z={LAYER.pane} />
      <Quads data={data.blinds} map={blindStripes()} z={LAYER.blind} />
    </group>
  );
};

export const Tower = ({ spec, skip }: { spec: TowerSpec; skip?: Cell }) => {
  const width = spec.cols * PITCH.x;
  const depth = spec.sideCols * PITCH.x;
  const height = spec.rows * PITCH.y;
  return (
    <group position={spec.position}>
      <mesh position={[0, height / 2, -depth / 2 - 0.02]}>
        <boxGeometry args={[width, height, depth]} />
        <meshBasicMaterial color={WALL} />
      </mesh>
      <Face cols={spec.cols} rows={spec.rows} seed={spec.seed} skip={skip} position={[0, 0, 0]} rotationY={0} />
      <Face cols={spec.sideCols} rows={spec.rows} seed={spec.seed + 1} position={[width / 2, 0, -depth / 2]} rotationY={Math.PI / 2} />
    </group>
  );
};

export const Skyline = () => (
  <>
    <Tower spec={MAIN_TOWER} skip={LIT_CELL} />
    {NEIGHBOURS.map((spec) => (
      <Tower key={spec.seed} spec={spec} />
    ))}
  </>
);
