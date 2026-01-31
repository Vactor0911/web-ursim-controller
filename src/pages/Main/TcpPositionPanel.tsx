import { Stack } from "@mui/material";
import Panel from "../../components/Panel";
import ForwardRoundedIcon from "@mui/icons-material/ForwardRounded";
import ControllerButton from "./ControllerButton";

const TcpPositionPanel = () => {
  return (
    <Panel label="TCP Position">
      <Stack p={1}>
        <Stack
          direction="row"
          alignContent="center"
          justifyContent="center"
          gap="50px"
          overflow="hidden"
        >
          {/* Z+ */}
          <ControllerButton label="Z+">
            <ForwardRoundedIcon
              viewBox="4 4 16 16"
              sx={{
                fontSize: "6.5rem",
                color: "#84CAFF",
                transform: "rotate(-90deg)",
              }}
            />
          </ControllerButton>

          {/* Z- */}
          <ControllerButton label="Z-">
            <ForwardRoundedIcon
              viewBox="4 4 16 16"
              sx={{
                fontSize: "6.5rem",
                color: "#84CAFF",
                transform: "rotate(90deg)",
              }}
            />
          </ControllerButton>
        </Stack>

        <Stack
          position="relative"
          gap="50px"
          sx={{
            transform: "perspective(300px) rotateX(40deg) translateY(-50px)",
            transformStyle: "preserve-3d",
          }}
        >
          {/* X- */}
          <ControllerButton label="X-">
            <ForwardRoundedIcon
              viewBox="4 4 16 16"
              sx={{
                fontSize: "6.5rem",
                color: "#FF9EA5",
                transform: "rotate(-90deg)",
              }}
            />
          </ControllerButton>

          {/* X+ */}
          <ControllerButton label="X+">
            <ForwardRoundedIcon
              viewBox="4 4 16 16"
              sx={{
                fontSize: "6.5rem",
                color: "#FF9EA5",
                transform: "rotate(90deg)",
              }}
            />
          </ControllerButton>

          {/* Y축 */}
          <Stack
            width="100%"
            direction="row"
            justifyContent="center"
            alignItems="center"
            position="absolute"
            top="50%"
            left={0}
            gap="50px"
            sx={{
              transform: "translateY(-50%)",
            }}
          >
            {/* Y- */}
            <ControllerButton label="Y-">
              <ForwardRoundedIcon
                viewBox="4 4 16 16"
                sx={{
                  fontSize: "6.5rem",
                  color: "#7BDF84",
                  transform: "rotate(180deg)",
                }}
              />
            </ControllerButton>

            {/* Y+ */}
            <ControllerButton label="Y+">
              <ForwardRoundedIcon
                viewBox="4 4 16 16"
                sx={{
                  fontSize: "6.5rem",
                  color: "#7BDF84",
                }}
              />
            </ControllerButton>
          </Stack>
        </Stack>
      </Stack>
    </Panel>
  );
};

export default TcpPositionPanel;
