import { CssBaseline, ThemeProvider } from "@mui/material";
import Main from "./pages/Main";
import { theme } from "./utils/theme";
import Header from "./components/Header";
import { Object3D } from "three";

// Z+ up 설정
Object3D.DEFAULT_UP.set(0, 0, 1);

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      <Header />
      <Main />
    </ThemeProvider>
  );
};

export default App;
