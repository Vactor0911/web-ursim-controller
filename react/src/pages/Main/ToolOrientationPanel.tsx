import { Stack, Switch, Typography } from "@mui/material";
import Panel from "../../components/Panel";
import { useCallback, useState } from "react";
import { formatUnitValue } from "../../utils";
import { useAtomValue } from "jotai";
import { robotDataAtom } from "../../states";

const ToolOrientationPanel = () => {
  const robotData = useAtomValue(robotDataAtom);
  const [orientationUnit, setOrientationUnit] = useState<"rad" | "deg">("rad");

  const handleOrientationUnitToggle = useCallback(() => {
    setOrientationUnit((prev) => (prev === "rad" ? "deg" : "rad"));
  }, []);

  return (
    <Panel label="Tool Orientation" flex={1}>
      <Stack gap={1} p={1} py={2}>
        <Typography variant="h6" fontWeight={400}>
          RX{" "}
          <strong>
            {formatUnitValue(robotData?.rotation.rx || 0, orientationUnit)}
          </strong>{" "}
          {orientationUnit}
        </Typography>
        <Typography variant="h6" fontWeight={400}>
          RY{" "}
          <strong>
            {formatUnitValue(robotData?.rotation.ry || 0, orientationUnit)}
          </strong>{" "}
          {orientationUnit}
        </Typography>
        <Typography variant="h6" fontWeight={400}>
          RZ{" "}
          <strong>
            {formatUnitValue(robotData?.rotation.rz || 0, orientationUnit)}
          </strong>{" "}
          {orientationUnit}
        </Typography>

        {/* 단위 변환 스위치 */}
        <Stack direction="row" alignItems="center" alignSelf="center" gap={1}>
          <Typography
            variant="body1"
            fontWeight="bold"
            color={
              orientationUnit === "rad" ? "secondary.main" : "text.primary"
            }
            sx={{
              transition: "color 0.3s",
            }}
          >
            rad
          </Typography>

          <Switch
            color="secondary"
            onChange={handleOrientationUnitToggle}
            checked={orientationUnit === "deg"}
          />

          <Typography
            variant="body1"
            fontWeight="bold"
            color={
              orientationUnit === "deg" ? "secondary.main" : "text.primary"
            }
            sx={{
              transition: "color 0.3s",
            }}
          >
            deg
          </Typography>
        </Stack>
      </Stack>
    </Panel>
  );
};

export default ToolOrientationPanel;
