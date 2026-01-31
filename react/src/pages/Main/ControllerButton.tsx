import { ButtonBase, Typography, type ButtonProps } from "@mui/material";
import type { ReactNode } from "react";

interface ControllerButtonProps extends ButtonProps {
  children: ReactNode;
  label: string;
}

const ControllerButton = (props: ControllerButtonProps) => {
  const { children, label, ...others } = props;

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
      {...others}
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
