import { RouterProvider, createBrowserRouter } from "react-router-dom";
import {
  ENTRY,
  ERA,
  HOME,
  PROFILE,
  SEASON,
  TOPIC,
  VERIFICATION,
  VERSION2,
} from "../../consts/links.const";
import { TopicList, topicListLoader } from "../../screens/TopicList";
import { EraList, eraListLoader } from "../../screens/EraList";
import { Era, eraLoader } from "../../screens/Era";
import { Entry, entryLoader } from "../../screens/Entry";
import { Profile } from "../../screens/Profile";
import { Verification } from "../../screens/Verification";
import { verificationLoader } from "../../screens/Verification/verification.Loader.helper";
import { Home, homeLoader } from "../../screens/Home";
import { Season, SeasonsLoader } from "../../screens/Season";

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
    },
    {
      path: VERIFICATION,
      element: <Verification />,
      loader: verificationLoader(),
    },
    {
      path: VERSION2,
      element: <Home />,
      loader: homeLoader(),
    },
    {
      path: SEASON,
      element: <Season />,
      loader: SeasonsLoader(),
    },
  ]);

  return <RouterProvider router={router} />;
};
