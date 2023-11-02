import {
  AppBar,
  Box,
  Button,
  ThemeProvider,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useLoaderData } from "react-router-dom";
import { theme } from "../../theme";
import { IBrand } from "../../interfaces/brand.interface";
import { AppWrapper, SeasonCard } from "../../components";
import { useNavigation, useUser } from "../../hooks";
import { HOME } from "../../consts/links.const";
import {
  useRequestFollow,
  useRequestFollows,
  useRequestUnfollow,
} from "../../requests/useRequestFollow";
import { Masonry } from "@mui/lab";

export const Brand = () => {
  const { onBack } = useNavigation();
  const { brand } = useLoaderData() as any as {
    brand?: IBrand;
  };

  const { data: follows, isLoading } = useRequestFollows("brand");
  const { mutate: followBrand, isLoading: isLoadingFollowAction } =
    useRequestFollow();
  const { mutate: unfollowBrand, isLoading: isLoadingUnfollowAction } =
    useRequestUnfollow();
  const { user } = useUser();

  const theme2 = useTheme();
  const isMobile = useMediaQuery(theme2.breakpoints.down("sm"));

  if (!brand) return <div>Loading...</div>;

  const isFollowing = follows?.find(
    (follow) => follow.targetId === brand.$id && follow.targetType === "brand"
  );

  const onFollow = () => {
    if (!user) return;
    if (isFollowing) {
      unfollowBrand(isFollowing);
    } else {
      followBrand({
        targetType: "brand",
        targetId: brand.$id,
        userId: user.$id,
      });
    }
  };

  const modedTheme = theme("light", brand.primaryColor, brand.secondaryColor);
  const lastSeason = brand.seasons[0];
  const restOfSeasons = brand.seasons.slice(1);

  return (
    <ThemeProvider theme={modedTheme}>
      <AppWrapper primaryColor={brand.primaryColor}>
        <Box sx={{ position: "sticky", top: -60, zIndex: 2 }}>
          <AppBar position="static">
            <Toolbar sx={{ alignItems: "flex-end" }}>
              <Button
                size="small"
                variant="outlined"
                sx={{ marginBottom: 1 }}
                onClick={() => onBack(HOME)}
              >
                Back
              </Button>
              <Box sx={{ margin: 1, textAlign: "center", flexGrow: 1 }}>
                <Box
                  sx={{
                    backgroundImage: `url(${brand.logoLink})`,
                    backgroundSize: "contain",
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "center",
                    width: "100%",
                    maxHeight: "60px",
                    minHeight: "60px",
                  }}
                />
                <Typography variant="h6" component="div">
                  {brand.name}
                </Typography>
              </Box>
              <Button
                size="small"
                variant={isFollowing ? "contained" : "outlined"}
                sx={{
                  marginBottom: 1,
                  visibility: user ? "visible" : "hidden",
                }}
                onClick={onFollow}
                disabled={
                  isLoading || isLoadingFollowAction || isLoadingUnfollowAction
                }
              >
                {isFollowing ? "Following" : "Follow"}
              </Button>
            </Toolbar>
          </AppBar>
        </Box>
        {lastSeason && <SeasonCard season={lastSeason} brandView />}
        {restOfSeasons.length > 0 && (
          <Box marginX={1} marginY={2}>
            <Typography
              variant="h6"
              component="div"
              sx={{ textDecoration: "underline" }}
            >
              Seasons
            </Typography>

            <Masonry columns={isMobile ? 2 : 3} spacing={2}>
              {restOfSeasons?.map((season) =>
                season.isPublic ? (
                  <SeasonCard season={season} brandView key={season.$id} />
                ) : null
              )}
            </Masonry>
          </Box>
        )}
      </AppWrapper>
    </ThemeProvider>
  );
};
