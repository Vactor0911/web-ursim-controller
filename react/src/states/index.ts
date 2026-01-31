import { atom } from "jotai";
import { LoadingManager } from "three";
import URDFLoader from "urdf-loader";
import type { URDFRobot } from "urdf-loader";

const robotPromise = new Promise<URDFRobot>((resolve) => {
  const manager = new LoadingManager();
  const loader = new URDFLoader(manager);

  let robot: URDFRobot | null = null;
  loader.load("./ur10e.urdf", (urdf) => {
    robot = urdf;
    robot.rotateZ(Math.PI);
  });

  manager.onLoad = () => {
    resolve(robot!);
  };
});

/**
 * 메뉴 상태
 */
export const Menu = {
  Button: 0,
  Joystick: 1,
} as const;
export type Menu = (typeof Menu)[keyof typeof Menu];

export const menuAtom = atom<Menu>(Menu.Button);

// 로봇 데이터 상태
interface RobotData {
  uptime: {
    hours: number;
    minutes: number;
    seconds: number;
  };
  position: {
    x: number;
    y: number;
    z: number;
  };
  rotation: {
    rx: number;
    ry: number;
    rz: number;
  };
  joints: {
    base: number;
    shoulder: number;
    elbow: number;
    wrist1: number;
    wrist2: number;
    wrist3: number;
  };
  timestamp: string;
}
export const robotDataAtom = atom<RobotData | null>(null);

export const tcpDataAtom = atom<{
  x: number;
  y: number;
  z: number;
  rx: number;
  ry: number;
  rz: number;
}>({
  x: 0,
  y: 0,
  z: 0,
  rx: 0,
  ry: 0,
  rz: 0,
});

export const robotAtom = atom(await robotPromise);
