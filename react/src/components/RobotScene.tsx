import { useThree } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { useEffect } from "react";
import { useAtomValue } from "jotai";
import { robotAtom } from "../states";

const RobotScene = () => {
  const { scene } = useThree();
  const robot = useAtomValue(robotAtom);

  useEffect(() => {
    if (!robot) return;
    scene.add(robot);

    return () => {
      if (robot) {
        scene.remove(robot);
      }
    };
  }, [robot, scene]);

  return (
    <>
      <OrbitControls />
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
    </>
  );
};

export default RobotScene;
