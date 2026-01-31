import { ButtonBase, Stack, Typography, useTheme } from "@mui/material";
import { useAtom } from "jotai";
import { useCallback, type ReactNode } from "react";
import { Menu, menuAtom } from "../../states";

interface IconButtonProps {
  icon: ReactNode;
  label: string;
  menu: Menu;
}

const IconButton = (props: IconButtonProps) => {
  const { icon, label, menu } = props;

  const theme = useTheme();

  const [currentMenu, setCurrentMenu] = useAtom(menuAtom);

  const handleClick = useCallback(() => {
    setCurrentMenu(menu);
  }, [menu, setCurrentMenu]);

  return (
    <ButtonBase
      sx={{
        display: "flex",
        width: 64,
        height: 64,
        backgroundColor:
          currentMenu === menu ? theme.palette.secondary.main : "transparent",
        transition: "background-color 0.3s",
      }}
      onClick={handleClick}
    >
      <Stack p={1} justifyContent="center" alignItems="center">
        {icon}
        <Typography variant="caption">{label}</Typography>
      </Stack>
    </ButtonBase>
  );
};

export default IconButton;
