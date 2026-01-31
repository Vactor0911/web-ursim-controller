import { AppBar, Stack } from "@mui/material";
import IconButton from "./IconButton";
import ControlCameraRoundedIcon from "@mui/icons-material/ControlCameraRounded";
import { Menu } from "../../states";

const Header = () => {
  return (
    <AppBar
      position="static"
      sx={{
        height: 64,
      }}
    >
      <Stack direction="row" alignItems="center">
        {/* 메뉴 버튼 */}
        <IconButton
          icon={<ControlCameraRoundedIcon fontSize="large" />}
          label="Move"
          menu={Menu.Button}
        />
      </Stack>
    </AppBar>
  );
};

export default Header;
