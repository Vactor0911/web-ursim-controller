import { Stack } from "@mui/material";
import Panel from "../../components/Panel";
import ForwardRoundedIcon from "@mui/icons-material/ForwardRounded";
import ControllerButton from "./ControllerButton";
import ReplyRoundedIcon from "@mui/icons-material/ReplyRounded";

const TcpOrientationPanel = () => {
  return (
    <Panel label="TCP Orientation">
      <Stack p={1}>
        <Stack
          direction="row"
          alignContent="center"
          justifyContent="center"
          gap="50px"
          overflow="hidden"
        >
          {/* Z+ */}
          <ControllerButton label="RZ+">
            <ReplyRoundedIcon
              viewBox="2 2 22 22"
              sx={{
                fontSize: "8rem",
                color: "#84CAFF",
                transform: "rotate(-45deg)",
              }}
            />
          </ControllerButton>

          {/* Z- */}
          <ControllerButton label="RZ-">
            <ReplyRoundedIcon
              viewBox="2 2 22 22"
              sx={{
                fontSize: "8rem",
                color: "#84CAFF",
                transform: "rotateY(180deg) rotate(-45deg)",
              }}
            />
          </ControllerButton>
        </Stack>

        <Stack position="relative" gap="50px">
          {/* RY- */}
          <ControllerButton label="RY-">
            <ForwardRoundedIcon
              viewBox="4 4 16 16"
              sx={{
                fontSize: "6.5rem",
                color: "#7BDF84",
                transform: "rotate(-90deg)",
              }}
            />
          </ControllerButton>

          {/* RY+ */}
          <ControllerButton label="RY+">
            <ForwardRoundedIcon
              viewBox="4 4 16 16"
              sx={{
                fontSize: "6.5rem",
                color: "#7BDF84",
                transform: "rotate(90deg)",
              }}
            />
          </ControllerButton>

          {/* RX축 */}
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
            {/* RX+ */}
            <ControllerButton label="RX+">
              <ForwardRoundedIcon
                viewBox="4 4 16 16"
                sx={{
                  fontSize: "6.5rem",
                  color: "#FF9EA5",
                  transform: "rotate(180deg)",
                }}
              />
            </ControllerButton>

            {/* RX- */}
            <ControllerButton label="RX-">
              <ForwardRoundedIcon
                viewBox="4 4 16 16"
                sx={{
                  fontSize: "6.5rem",
                  color: "#FF9EA5",
                }}
              />
            </ControllerButton>
          </Stack>
        </Stack>
      </Stack>
    </Panel>
  );
};

export default TcpOrientationPanel;
