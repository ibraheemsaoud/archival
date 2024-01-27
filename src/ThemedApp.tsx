import { CssBaseline, ThemeProvider } from "@mui/material";

import { Router } from "./components";
import { theme } from "./theme";

import { useUser } from "./hooks";
import { Toaster } from "react-hot-toast";

export const ThemedApp = () => {
  const { colorModeDark } = useUser();
  const modedTheme = theme(colorModeDark ? "dark" : "light");

  return (
    <ThemeProvider theme={modedTheme}>
      <CssBaseline enableColorScheme />
      <Router />
      <Toaster position="bottom-left" reverseOrder={false} />
    </ThemeProvider>
  );
};
