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

import { Client } from "appwrite";
import { Server } from "./config/server";

function App() {
  const modedTheme = theme("light");
  const queryClient = new QueryClient();

  const client = new Client()
    .setEndpoint(Server.endpoint) // Your API Endpoint
    .setProject(Server.project);

  client.subscribe("files", (response) => {
    if (response.events.includes("buckets.*.files.*.create")) {
      // Log when a new file is uploaded
      console.log(response.payload);
    }
  });

  return (
    <ThemeProvider theme={modedTheme}>
      <CssBaseline enableColorScheme />
      <QueryClientProvider client={queryClient}>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <Router />
        </LocalizationProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;
