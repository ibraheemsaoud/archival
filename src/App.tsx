import React from "react";
import "./App.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { TopicSelector } from "./screens/TopicSelector";
import { EraSelector, eraListLoader } from "./screens/EraSelector";
import { Era, eraLoader } from "./screens/Era";

function App() {
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
    // {
    //   path: "/entry/:entryId",
    //   element: <div>Entry</div>,
    //   loader: entryLoader,
    // }
  ]);

  return (
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  );
}

export default App;
