import { AppBar, Stack, Toolbar } from "@mui/material";
import IconButton from "./IconButton";
import GamesRoundedIcon from "@mui/icons-material/GamesRounded";
import ControlCameraRoundedIcon from "@mui/icons-material/ControlCameraRounded";
import { Menu } from "../../states";

const Header = () => {
  return (
    <AppBar>
      <Toolbar>
        <Stack direction="row" alignItems="center">
          {/* 메뉴 버튼 */}
          <IconButton
            icon={<GamesRoundedIcon fontSize="large" />}
            label="버튼"
            menu={Menu.Button}
          />

          <IconButton
            icon={<ControlCameraRoundedIcon fontSize="large" />}
            label="조이스틱"
            menu={Menu.Joystick}
          />
        </Stack>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
