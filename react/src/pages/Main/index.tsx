import { Stack } from "@mui/material";
import ToolPositionPanel from "./ToolPositionPanel";
import ToolOrientationPanel from "./ToolOrientationPanel";
import TcpPositionPanel from "./TcpPositionPanel";
import TcpOrientationPanel from "./TcpOrientationPanel";
import { useSocket } from "../../hook/socket";
import { useEffect, useState } from "react";
import { useAtomValue } from "jotai";
import { tcpDataAtom } from "../../states";
import Panel from "../../components/Panel";
import RobotScene from "../../components/RobotScene";
import { Canvas } from "@react-three/fiber";

const Main = () => {
  const { connected, sendCommand } = useSocket();

  const tcpData = useAtomValue(tcpDataAtom);
  const [stopped, setStopped] = useState(true);

  // 로봇 제어 명령 전송
  useEffect(() => {
    const interval = setInterval(() => {
      if (!connected) {
        return;
      }

      // TCP 데이터 추출
      const { x, y, z, rx, ry, rz } = tcpData;
      if (!x && !y && !z && !rx && !ry && !rz) {
        // 모든 값이 0이면 정지 명령 전송
        if (!stopped) {
          sendCommand("message", "stopl(0.5)\n");
          setStopped(true);
        }
        return;
      } else if (stopped) {
        setStopped(false);
      }

      // 로봇 제어 명령 전송
      sendCommand(
        "message",
        `speedl([${x}, ${y}, ${z}, ${rx}, ${ry}, ${rz}], 0.5, 0.1)\n`,
      );
    }, 100);
    return () => {
      clearInterval(interval);
    };
  }, [connected, sendCommand, stopped, tcpData]);
  return (
    <Stack direction="row" height="calc(100vh - 64px)">
      {/* 위치 */}
      <Stack flex={1}>
        {/* Tool Position */}
        <ToolPositionPanel />

        {/* TCP Position */}
        <TcpPositionPanel />
      </Stack>

      {/* Robot */}
      <Panel label="Robot" flex={3} height="100%">
        <Canvas camera={{ position: [0, -3, 0], fov: 60 }}>
          <RobotScene />
        </Canvas>
      </Panel>

      {/* 회전 */}
      <Stack flex={1}>
        {/* Tool Orientation */}
        <ToolOrientationPanel />

        {/* TCP Orientation */}
        <TcpOrientationPanel />
      </Stack>
    </Stack>
  );
};

export default Main;
