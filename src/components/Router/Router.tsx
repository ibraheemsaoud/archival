import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { HOME, POST, PROFILE, SEASON, VERIFICATION } from "../../consts/links.const";
import { Profile } from "../../screens/Profile";
import { Verification } from "../../screens/Verification";
import { verificationLoader } from "../../screens/Verification/verification.Loader.helper";
import { Home, homeLoader } from "../../screens/Home";
import { Season, seasonsLoader } from "../../screens/Season";
import { Post, postLoader } from "../../screens/Post";

export const Router = () => {
  const router = createBrowserRouter([
    {
      path: HOME,
      element: <Home />,
      loader: homeLoader(),
    },
    {
      path: PROFILE,
      element: <Profile />,
      loader: homeLoader(),
    },
    {
      path: VERIFICATION,
      element: <Verification />,
      loader: verificationLoader(),
    },
    {
      path: SEASON,
      element: <Season />,
      loader: seasonsLoader(),
    },
    {
      path: POST,
      element: <Post />,
      loader: postLoader(),
    }
  ]);

  return <RouterProvider router={router} />;
};
