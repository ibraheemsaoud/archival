import { RouterProvider, createBrowserRouter } from "react-router-dom";
import {
  BRAND,
  FASHION_WEEK,
  HOME,
  POST,
  PROFILE,
  SEASON,
  STYLING,
  TERMS,
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
import { Terms } from "../../screens/Terms";
import { FashionWeek, fashionWeekLoader } from "../../screens/FashionWeek";

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
      path: FASHION_WEEK,
      element: <FashionWeek />,
      loader: fashionWeekLoader(),
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
    {
      path: TERMS,
      element: <Terms />,
    }
  ]);

  return <RouterProvider router={router} />;
};
