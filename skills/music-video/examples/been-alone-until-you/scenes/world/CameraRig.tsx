import { useLayoutEffect } from "react";
import { useThree } from "@react-three/fiber";
import type { PerspectiveCamera } from "three";
import type { Vec3 } from "./layout";

type CameraRigProps = { position: Vec3; target: Vec3; roll?: number };

export const CameraRig = ({ position, target, roll = 0 }: CameraRigProps) => {
  const camera = useThree((state) => state.camera) as PerspectiveCamera;
  useLayoutEffect(() => {
    camera.position.set(position[0], position[1], position[2]);
    camera.up.set(Math.sin(roll), Math.cos(roll), 0);
    camera.lookAt(target[0], target[1], target[2]);
    camera.updateMatrixWorld();
  });
  return null;
};
