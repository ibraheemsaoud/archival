import {
  Box,
  Button,
  ButtonGroup,
  Grid,
  ThemeProvider,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useLoaderData } from "react-router-dom";
import { ISeason } from "../../interfaces/season.interface";
import { theme } from "../../theme";
import { AppWrapper, PostCard, TopToolbar } from "../../components";
import { HOME } from "../../consts/links.const";
import { PostUploader } from "./PostUploader";
import { useState } from "react";
import { Query } from "appwrite";
import { ReferenceSection } from "../Post/ReferencesSection";

export const Season = () => {
  const [query, setQuery] = useState("");
  const [shouldShowLogin, setShowLogin] = useState(false);

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

  const showLogin = () => {
    setShowLogin(false);
    setTimeout(() => {
      setShowLogin(true);
    });
  };

  return (
    <ThemeProvider theme={modedTheme}>
      <AppWrapper
        primaryColor={season.primaryColor}
        shouldLogin={shouldShowLogin}
      >
        <TopToolbar
          backAddress={HOME}
          logo={brand.logoLink}
          title={season.name}
        />
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
        <Box sx={{ marginTop: 2, maxHeight: 250, overflow: "hidden" }}>
          {season.coverImage && (
            <img
              src={season.coverImage}
              alt={season.name}
              style={{ maxWidth: "100%" }}
            />
          )}
        </Box>
        <ReferenceSection
          season={season}
          references={season.references}
          showLogin={showLogin}
        />
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
        <PostUploader seasonId={season.$id} />
      </AppWrapper>
    </ThemeProvider>
  );
};
