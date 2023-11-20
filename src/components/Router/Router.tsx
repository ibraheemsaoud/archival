import { RouterProvider, createBrowserRouter } from "react-router-dom";
import {
  BRAND,
  HOME,
  POST,
  PROFILE,
  SEASON,
  STYLING,
  VERIFICATION,
} from "../../consts/links.const";
import { Profile } from "../../screens/Profile";
import { Verification } from "../../screens/Verification";
import { verificationLoader } from "../../screens/Verification/verification.Loader.helper";
import { Home, homeLoader } from "../../screens/Home";
import { Season, seasonsLoader } from "../../screens/Season";
import { Post, postLoader } from "../../screens/Post";
import { Brand, brandLoader } from "../../screens/Brand";
import { Styling, stylingLoader } from "../../screens/Styling";

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
    },
    {
      path: BRAND,
      element: <Brand />,
      loader: brandLoader(),
    },
    {
      path: STYLING,
      element: <Styling />,
      loader: stylingLoader(),
    },
  ]);

  return <RouterProvider router={router} />;
};
