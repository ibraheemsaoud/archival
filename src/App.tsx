import React from "react";
import "./App.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { TopicSelector, topicLoader } from "./screens/TopicSelector";
import { EraSelector } from "./screens/EraSelector";

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
  ]);

  return (
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  );
}

export default App;
