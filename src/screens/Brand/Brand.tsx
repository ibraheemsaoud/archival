import {
  Box,
  Button,
  ThemeProvider,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useLoaderData } from "react-router-dom";
import { theme } from "../../theme";
import {
  AppWrapper,
  Error,
  Loader,
  SeasonCard,
  TopToolbar,
} from "../../components";
import { useUser } from "../../hooks";
import { HOME } from "../../consts/links.const";
import {
  useRequestFollow,
  useRequestFollows,
  useRequestUnfollow,
} from "../../requests/useRequestFollow";
import { Masonry } from "@mui/lab";
import { useRequestBrand } from "../../requests/useRequestBrand";

export const Brand = () => {
  const { brandId } = useLoaderData() as any as {
    brandId: string;
  };

  const { data: brand, error } = useRequestBrand(brandId);
  const { data: follows, isLoading } = useRequestFollows("brand");
  const { mutate: followBrand, isLoading: isLoadingFollowAction } =
    useRequestFollow();
  const { mutate: unfollowBrand, isLoading: isLoadingUnfollowAction } =
    useRequestUnfollow();
  const { user, colorModeDark } = useUser();

  const theme2 = useTheme();
  const isMobile = useMediaQuery(theme2.breakpoints.down("sm"));

  if (!brand) return <Loader />;

  const isFollowing = follows?.find(
    (follow) => follow.targetId === brandId && follow.targetType === "brand"
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

  const modedTheme = theme(
    colorModeDark ? "dark" : "light",
    brand.primaryColor,
    brand.secondaryColor
  );
  const lastSeason = brand.seasons[0];
  const restOfSeasons = brand.seasons.slice(1);

  const secondaryButton = (
    <Button
      size="small"
      variant={isFollowing ? "contained" : "outlined"}
      sx={{
        marginBottom: 1,
        visibility: user ? "visible" : "hidden",
      }}
      onClick={onFollow}
      disabled={isLoading || isLoadingFollowAction || isLoadingUnfollowAction}
    >
      {isFollowing ? "Following" : "Follow"}
    </Button>
  );

  return (
    <ThemeProvider theme={modedTheme}>
      <AppWrapper primaryColor={brand.primaryColor}>
        <TopToolbar
          backAddress={HOME}
          logo={brand.logoLink}
          title={brand.name}
          secondaryButton={secondaryButton}
        />
        <Error error={error} />
        {lastSeason && <SeasonCard season={lastSeason} brandView />}
        {restOfSeasons.length > 0 && (
          <Box marginX={1} marginY={2}>
            <Typography variant="h6">Seasons</Typography>

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
