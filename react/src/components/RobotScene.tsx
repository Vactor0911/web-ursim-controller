import { useThree } from "@react-three/fiber";
import { OrbitControls, TransformControls } from "@react-three/drei";
import { useEffect, useRef } from "react";
import { useAtomValue } from "jotai";
import { robotAtom } from "../states";
import { Object3D } from "three";
import { TransformControls as TransformControlsImpl } from "three-stdlib";

const RobotScene = () => {
  const { scene } = useThree();
  const robot = useAtomValue(robotAtom);
  const transformControlRef = useRef<TransformControlsImpl>(null);

  useEffect(() => {
    if (!robot) return;
    scene.add(robot);
    robot.links.tool0.add(new Object3D());
    console.log(transformControlRef.current);

    return () => {
      if (robot) {
        scene.remove(robot);
      }
    };
  }, [robot, scene]);

  return (
    <>
      <OrbitControls />
      <ambientLight intensity={1} />
      <pointLight position={[10, 10, 10]} intensity={2} decay={0} />
      <axesHelper args={[5]} />
      <TransformControls
        ref={transformControlRef}
        mode="translate"
        object={robot.links.tool0.children[0] as Object3D}
        space="local"
        enabled={false}
      />
    </>
  );
};

export default RobotScene;
