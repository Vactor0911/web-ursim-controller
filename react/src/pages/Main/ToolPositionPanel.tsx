import { Stack, Switch, Typography } from "@mui/material";
import Panel from "../../components/Panel";
import { useCallback, useState } from "react";
import { useAtomValue } from "jotai";
import { robotDataAtom } from "../../states";
import { formatUnitValue } from "../../utils";

const ToolPositionPanel = () => {
  const robotData = useAtomValue(robotDataAtom);
  const [positionUnit, setPositionUnit] = useState<"m" | "inch">("m");

  const handlePositionUnitToggle = useCallback(() => {
    setPositionUnit((prev) => (prev === "m" ? "inch" : "m"));
  }, []);

  return (
    <Panel label="Tool Position" flex={1}>
      <Stack gap={1} p={1} py={2}>
        <Typography variant="h6" fontWeight={400}>
          X{" "}
          <strong>
            {formatUnitValue(robotData?.position.x || 0, positionUnit)}
          </strong>{" "}
          {positionUnit}
        </Typography>
        <Typography variant="h6" fontWeight={400}>
          Y{" "}
          <strong>
            {formatUnitValue(robotData?.position.y || 0, positionUnit)}
          </strong>{" "}
          {positionUnit}
        </Typography>
        <Typography variant="h6" fontWeight={400}>
          Z{" "}
          <strong>
            {formatUnitValue(robotData?.position.z || 0, positionUnit)}
          </strong>{" "}
          {positionUnit}
        </Typography>

        {/* 단위 변환 스위치 */}
        <Stack direction="row" alignItems="center" alignSelf="center" gap={1}>
          <Typography
            variant="body1"
            fontWeight="bold"
            color={positionUnit === "m" ? "secondary.main" : "text.primary"}
            sx={{
              transition: "color 0.3s",
            }}
          >
            m
          </Typography>

          <Switch
            color="secondary"
            onChange={handlePositionUnitToggle}
            checked={positionUnit === "inch"}
          />

          <Typography
            variant="body1"
            fontWeight="bold"
            color={positionUnit === "inch" ? "secondary.main" : "text.primary"}
            sx={{
              transition: "color 0.3s",
            }}
          >
            inch
          </Typography>
        </Stack>
      </Stack>
    </Panel>
  );
};

export default ToolPositionPanel;
