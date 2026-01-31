import { Stack } from "@mui/material";
import Panel from "../../components/Panel";
import ToolPositionPanel from "./ToolPositionPanel";
import ToolOrientationPanel from "./ToolOrientationPanel";
import TcpPositionPanel from "./TcpPositionPanel";
import TcpOrientationPanel from "./TcpOrientationPanel";

const Main = () => {
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
      <Panel label="Robot" flex={3} height="100%"></Panel>

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
