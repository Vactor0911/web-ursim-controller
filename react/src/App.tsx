import { CssBaseline, ThemeProvider } from "@mui/material";
import Main from "./pages/Main";
import { theme } from "./utils/theme";
import Header from "./components/Header";

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
