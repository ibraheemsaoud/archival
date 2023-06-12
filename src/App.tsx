import React, { useMemo, useState } from "react";
import "./App.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { TopicList, topicListLoader } from "./screens/TopicList";
import { EraList, useEraListLoader } from "./screens/EraList";
import { Era, useEraLoader } from "./screens/Era";
import { Entry, useEntryLoader } from "./screens/Entry";
import { CssBaseline, PaletteMode, ThemeProvider } from "@mui/material";
import { theme } from "./theme";
import { QueryClient, QueryClientProvider } from "react-query";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { ENTRY, ERA, HOME, TOPIC } from "./consts/links.const";

function App() {
  const [mode, setMode] = useState<PaletteMode>("light");
  const modedTheme = useMemo(() => theme(mode), [mode]);

  const entryLoader = useEntryLoader;
  const eraListLoader = useEraListLoader;
  const eraLoader = useEraLoader;

  const router = createBrowserRouter([
    {
      path: HOME,
      element: <TopicList />,
      loader: topicListLoader,
    },
    {
      path: TOPIC,
      element: <EraList />,
      loader: eraListLoader,
    },
    {
      path: ERA,
      element: <Era />,
      loader: eraLoader,
    },
    {
      path: ENTRY,
      element: <Entry />,
      loader: entryLoader,
    },
  ]);

  const queryClient = new QueryClient();

  return (
    <React.StrictMode>
      <ThemeProvider theme={modedTheme}>
        <CssBaseline enableColorScheme />
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={router} />
        </QueryClientProvider>
      </ThemeProvider>
    </React.StrictMode>
  );
}

export default App;
