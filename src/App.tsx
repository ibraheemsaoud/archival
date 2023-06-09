import React from "react";
import "./App.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { TopicSelector, topicLoader } from "./screens/TopicSelector";
import { EraSelector, eraLoader } from "./screens/EraSelector";
import { Era } from "./screens/Era";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <TopicSelector />,
    },
    {
      path: "/topic/:topicId",
      element: <EraSelector />,
      loader: topicLoader,
    },
    {
      path: "/era/:eraId",
      element: <Era />,
      loader: eraLoader,
    },
  ]);

  return (
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  );
}

export default App;
