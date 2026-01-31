import { ButtonBase, Typography } from "@mui/material";
import type { ReactNode } from "react";

interface ControllerButtonProps {
  children: ReactNode;
  label: string;
}

const ControllerButton = (props: ControllerButtonProps) => {
  const { children, label } = props;

  return (
    <ButtonBase
      disableTouchRipple
      sx={{
        padding: 0,
        position: "relative",
        "&:active .MuiSvgIcon-root": {
          filter: "brightness(0.8)",
        },
      }}
    >
      {children}
      <Typography
        variant="h6"
        position="absolute"
        top="50%"
        left="50%"
        sx={{
          transform: "translate(-50%, -50%)",
        }}
      >
        {label}
      </Typography>
    </ButtonBase>
  );
};

export default ControllerButton;
