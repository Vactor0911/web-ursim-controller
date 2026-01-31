import { createTheme, responsiveFontSizes } from "@mui/material";

// 파레트
const palette = {
  primary: {
    main: "#313131",
  },
  secondary: {
    main: "#52A2D6",
  },
};

// 타이포그래피
const typography = {
  fontFamily: ["Noto Sans KR", "sans-serif"].join(","),
  h1: { fontWeight: 700 },
  h2: { fontWeight: 700 },
  h3: { fontWeight: 700 },
  h4: { fontWeight: 700 },
  h5: { fontWeight: 700 },
  h6: { fontWeight: 700 },
};

/**
 * MUI 테마
 */
export const theme = responsiveFontSizes(
  createTheme({
    palette,
    typography,
  }),
);
