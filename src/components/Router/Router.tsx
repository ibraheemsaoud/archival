import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { ENTRY, ERA, HOME, TOPIC } from "../../consts/links.const";
import { TopicList, topicListLoader } from "../../screens/TopicList";
import { EraList, eraListLoader } from "../../screens/EraList";
import { Era, eraLoader } from "../../screens/Era";
import { Entry, entryLoader } from "../../screens/Entry";

export const Router = () => {
  const router = createBrowserRouter([
    {
      path: HOME,
      element: <TopicList />,
      loader: topicListLoader(),
    },
    {
      path: TOPIC,
      element: <EraList />,
      loader: eraListLoader(),
    },
    {
      path: ERA,
      element: <Era />,
      loader: eraLoader(),
    },
    {
      path: ENTRY,
      element: <Entry />,
      loader: entryLoader(),
    },
  ]);

  return <RouterProvider router={router} />;
};
