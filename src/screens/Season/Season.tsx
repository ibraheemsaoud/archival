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
import { IPost } from "../../interfaces/post.interface";
import { AppWrapper, PostCard } from "../../components";
import { useNavigation } from "../../hooks";
import { HOME } from "../../consts/links.const";

export const Season = () => {
  const { onBack } = useNavigation();
  const { season, posts, brand } = useLoaderData() as any as {
    brand?: IBrand;
    season?: ISeason;
    posts?: IPost[];
  };

  if (!season || !brand) return <div>Loading...</div>;

  const modedTheme = theme("light", season.primaryColor);

  const featuredPosts = posts?.slice(0, 2);
  const otherPosts = posts?.slice(2);

  return (
    <ThemeProvider theme={modedTheme}>
      <AppWrapper>
        <Box sx={{ flexGrow: 1 }}>
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
                  {season.name}
                </Typography>
              </Box>

              <Button
                size="small"
                variant="outlined"
                sx={{ marginBottom: 1 }}
                onClick={() => {}}
              >
                Chat
              </Button>
            </Toolbar>
          </AppBar>
        </Box>
        {featuredPosts?.length && (
          <Grid
            sx={{
              display: "flex",
              flexFlow: "wrap",
              justifyContent: "space-around",
              marginTop: 2,
            }}
          >
            {featuredPosts.map((post) => (
              <PostCard
                post={post}
                primaryColor={season.primaryColor}
                secondaryColor={season.secondaryColor}
              />
            ))}
          </Grid>
        )}
        <Box sx={{ marginY: 2, maxHeight: 250, overflow: "hidden" }}>
          {season.coverImage && (
            <img
              src={season.coverImage}
              alt={season.name}
              style={{ maxWidth: "100%" }}
            />
          )}
        </Box>
        {otherPosts?.length && (
          <Grid
            sx={{
              display: "flex",
              flexFlow: "wrap",
              justifyContent: "space-around",
              marginBottom: 2,
            }}
          >
            {otherPosts.map((post) => (
              <PostCard
                post={post}
                primaryColor={season.primaryColor}
                secondaryColor={season.secondaryColor}
              />
            ))}
          </Grid>
        )}
      </AppWrapper>
    </ThemeProvider>
  );
};
