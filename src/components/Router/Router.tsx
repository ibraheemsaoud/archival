import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { HOME, PROFILE, SEASON, VERIFICATION } from "../../consts/links.const";
import { Profile } from "../../screens/Profile";
import { Verification } from "../../screens/Verification";
import { verificationLoader } from "../../screens/Verification/verification.Loader.helper";
import { Home, homeLoader } from "../../screens/Home";
import { Season, SeasonsLoader } from "../../screens/Season";

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
      loader: SeasonsLoader(),
    },
  ]);

  return <RouterProvider router={router} />;
};
