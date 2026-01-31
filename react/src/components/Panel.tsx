import {
  Box,
  Stack,
  Typography,
  useTheme,
  type StackProps,
} from "@mui/material";

interface PanelProps extends StackProps {
  label: string;
}

const Panel = (props: PanelProps) => {
  const { label, children, ...others } = props;

  const theme = useTheme();

  return (
    <Stack p={0.5} {...others}>
      <Typography
        variant="h6"
        fontWeight={400}
        px={1}
        sx={{
          backgroundColor: theme.palette.grey[500],
        }}
      >
        {label}
      </Typography>

      <Box bgcolor="white" flex={1}>{children}</Box>
    </Stack>
  );
};

export default Panel;
