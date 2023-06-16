import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { ENTRY, ERA, HOME, TOPIC } from "../../consts/links.const";
import { TopicList, topicListLoader } from "../../screens/TopicList";
import { EraList, useEraListLoader } from "../../screens/EraList";
import { Era, useEraLoader } from "../../screens/Era";
import { Entry, useEntryLoader } from "../../screens/Entry";

export const Router = () => {
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

  return <RouterProvider router={router} />;
};
