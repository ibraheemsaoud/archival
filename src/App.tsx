import React, { useMemo, useState } from "react";
import "./App.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { TopicSelector, topicListLoader } from "./screens/TopicSelector";
import { EraSelector, eraListLoader } from "./screens/EraSelector";
import { Era, eraLoader } from "./screens/Era";
import { Entery, entryLoader } from "./screens/Entery";
import { CssBaseline, PaletteMode, ThemeProvider } from "@mui/material";
import { theme } from "./theme";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { ENTERY, ERA, HOME, TOPIC } from "./consts/links.const";

function App() {
  const [mode, setMode] = useState<PaletteMode>("light");
  const modedTheme = useMemo(() => theme(mode), [mode]);

  const router = createBrowserRouter([
    {
      path: HOME,
      element: <TopicSelector />,
      loader: topicListLoader,
    },
    {
      path: TOPIC,
      element: <EraSelector />,
      loader: eraListLoader,
    },
    {
      path: ERA,
      element: <Era />,
      loader: eraLoader,
    },
    {
      path: ENTERY,
      element: <Entery />,
      loader: entryLoader,
    },
  ]);

  return (
    <React.StrictMode>
      <ThemeProvider theme={modedTheme}>
        <CssBaseline enableColorScheme />
        <RouterProvider router={router} />
      </ThemeProvider>
    </React.StrictMode>
  );
}

export default App;
