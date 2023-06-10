import React, { useMemo, useState } from "react";
import "./App.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { TopicSelector } from "./screens/TopicSelector";
import { EraSelector, eraListLoader } from "./screens/EraSelector";
import { Era, eraLoader } from "./screens/Era";
import { Entery, entryLoader } from "./screens/Entery";
import { CssBaseline, PaletteMode, ThemeProvider } from "@mui/material";
import { theme } from "./theme";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

function App() {
  const [mode, setMode] = useState<PaletteMode>("light");
  const modedTheme = useMemo(() => theme(mode), [mode]);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <TopicSelector />,
    },
    {
      path: "/topic/:topicId",
      element: <EraSelector />,
      loader: eraListLoader,
    },
    {
      path: "/era/:eraId",
      element: <Era />,
      loader: eraLoader,
    },
    {
      path: "/entry/:entryId",
      element: <Entery />,
      loader: entryLoader,
    },
  ]);

  return (
    <React.StrictMode>
      <CssBaseline enableColorScheme />
      <ThemeProvider theme={modedTheme}>
        <RouterProvider router={router} />
      </ThemeProvider>
    </React.StrictMode>
  );
}

export default App;
