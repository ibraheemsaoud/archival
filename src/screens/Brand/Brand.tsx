import {
  AppBar,
  Box,
  Button,
  Grid,
  ThemeProvider,
  Toolbar,
  Typography,
} from "@mui/material";
import { useLoaderData } from "react-router-dom";
import { ISeason } from "../../interfaces/season.interface";
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

export const Brand = () => {
  const { onBack } = useNavigation();
  const { brand } = useLoaderData() as any as {
    brand?: IBrand;
  };

  console.log(brand);

  const { data: follows, isLoading } = useRequestFollows("brand");
  const { mutate: followBrand, isLoading: isLoadingFollowAction } =
    useRequestFollow();
  const { mutate: unfollowBrand, isLoading: isLoadingUnfollowAction } =
    useRequestUnfollow();
  const { user } = useUser();

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
            <Grid container spacing={1}>
              {restOfSeasons.map((season: ISeason) => (
                <Grid item xs={6} lg={4} key={season.$id}>
                  <SeasonCard season={season} brandView />
                </Grid>
              ))}
            </Grid>
          </Box>
        )}
      </AppWrapper>
    </ThemeProvider>
  );
};
