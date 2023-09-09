import {
  AppBar,
  Box,
  Button,
  ButtonGroup,
  Grid,
  ThemeProvider,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useLoaderData } from "react-router-dom";
import { ISeason } from "../../interfaces/season.interface";
import { theme } from "../../theme";
import { AppWrapper, PostCard } from "../../components";
import { useNavigation } from "../../hooks";
import { HOME } from "../../consts/links.const";
import { PostUploader } from "./PostUploader";
import { useState } from "react";
import { Query } from "appwrite";

export const Season = () => {
  const [query, setQuery] = useState("");
  const { onBack } = useNavigation();
  const { season } = useLoaderData() as any as {
    season?: ISeason;
  };
  const { brand, posts } = season || {};

  const theme2 = useTheme();
  const isMobile = useMediaQuery(theme2.breakpoints.down("sm"));

  if (!season || !brand) return <div>Loading...</div>;

  const modedTheme = theme("light", season.primaryColor, season.secondaryColor);

  const featuredPosts = posts?.slice(0, 2);
  const otherPosts = posts?.slice(2);

  return (
    <ThemeProvider theme={modedTheme}>
      <AppWrapper primaryColor={season.primaryColor}>
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
                  {season.name}
                </Typography>
              </Box>

              <Button
                size="small"
                variant="outlined"
                sx={{ marginBottom: 1, visibility: "hidden" }}
                onClick={() => {}}
              >
                Chat
              </Button>
            </Toolbar>
          </AppBar>
        </Box>
        <Box
          sx={{ margin: 2, textAlign: "right", marginRight: isMobile ? 2 : 4 }}
        >
          <ButtonGroup fullWidth={isMobile}>
            <Button
              onClick={() => setQuery("")}
              size="small"
              variant={query === "" ? "contained" : "outlined"}
            >
              Normal
            </Button>
            <Button
              onClick={() => setQuery(Query.orderDesc("referencesCount"))}
              size="small"
              variant={
                query === Query.orderDesc("referencesCount")
                  ? "contained"
                  : "outlined"
              }
            >
              Referential
            </Button>
            <Button
              onClick={() => setQuery(Query.orderDesc("commentsCount"))}
              size="small"
              variant={
                query === Query.orderDesc("commentsCount")
                  ? "contained"
                  : "outlined"
              }
            >
              Discussed
            </Button>
          </ButtonGroup>
        </Box>
        {featuredPosts?.length ? (
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
                key={post.$id}
              />
            ))}
          </Grid>
        ) : null}
        <Box sx={{ marginY: 2, maxHeight: 250, overflow: "hidden" }}>
          {season.coverImage && (
            <img
              src={season.coverImage}
              alt={season.name}
              style={{ maxWidth: "100%" }}
            />
          )}
        </Box>
        {otherPosts?.length ? (
          <Grid
            sx={{
              display: "flex",
              flexFlow: "wrap",
              justifyContent: "space-around",
              "& > *": {
                marginTop: 2,
              },
            }}
          >
            {otherPosts.map((post) => (
              <PostCard
                post={post}
                primaryColor={season.primaryColor}
                secondaryColor={season.secondaryColor}
                key={post.$id}
              />
            ))}
          </Grid>
        ) : null}
        <PostUploader seasonId={season.slug} />
      </AppWrapper>
    </ThemeProvider>
  );
};
