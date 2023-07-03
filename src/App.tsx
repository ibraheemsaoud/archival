import "./App.css";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { QueryClient, QueryClientProvider } from "react-query";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { Router } from "./components";
import { theme } from "./theme";

import { UserProvider } from "./hooks";
import { Toaster } from "react-hot-toast";

function App() {
  const modedTheme = theme("light");
  const queryClient = new QueryClient();

  return (
    <ThemeProvider theme={modedTheme}>
      <CssBaseline enableColorScheme />
      <QueryClientProvider client={queryClient}>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <UserProvider>
            <Router />
            <Toaster position="bottom-left" reverseOrder={false} />
          </UserProvider>
        </LocalizationProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;
