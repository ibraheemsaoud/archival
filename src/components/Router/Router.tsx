import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { ENTRY, ERA, HOME, PROFILE, TOPIC, VERIFICATION } from "../../consts/links.const";
import { TopicList, topicListLoader } from "../../screens/TopicList";
import { EraList, eraListLoader } from "../../screens/EraList";
import { Era, eraLoader } from "../../screens/Era";
import { Entry, entryLoader } from "../../screens/Entry";
import { Profile } from "../../screens/Profile";
import { Verification } from "../../screens/Verification";

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
    {
      path: PROFILE,
      element: <Profile />,
      loader: topicListLoader(),
    }, {
      path: VERIFICATION,
      element: <Verification />,
    }
  ]);

  return <RouterProvider router={router} />;
};
