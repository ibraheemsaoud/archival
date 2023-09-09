import {
  AppBar,
  Box,
  Button,
  ThemeProvider,
  Toolbar,
  Typography,
} from "@mui/material";
import { useLoaderData } from "react-router-dom";
import { IPost } from "../../interfaces/post.interface";
import { AppWrapper } from "../../components";
import { SEASON } from "../../consts/links.const";
import { useNavigation } from "../../hooks";
import { replaceRouteParams } from "../../helpers";
import { useRequestSeason } from "../../requests/useRequestSeason";
import { theme } from "../../theme";
import { CommentSection } from "./CommentSection";
import { ReferenceSection } from "./ReferencesSection";
import { useRequestReferences } from "../../requests/useRequestReference";
import { useState } from "react";

export const Post = () => {
  const [shouldShowLogin, setShowLogin] = useState(false);

  const { onBack } = useNavigation();
  const { post } = useLoaderData() as any as {
    post?: IPost;
  };

  const { data: references } = useRequestReferences(post?.$id);
  const { data: season, isLoading: isSeasonLoading } = useRequestSeason(
    post?.seasonId
  );
  const { brand } = season || {};

  if (isSeasonLoading) return <div>Loading...</div>;
  if (!post || !season || !brand) return <div>Not found</div>;

  const modedTheme = theme("light", season.primaryColor, season.secondaryColor);
  const onBackClicked = () => {
    onBack(replaceRouteParams(SEASON, { seasonId: season.slug }));
  };

  const showLogin = () => {
    setShowLogin(false);
    setTimeout(() => {
      setShowLogin(true);
    });
  };

  return (
    <ThemeProvider theme={modedTheme}>
      <AppWrapper shouldLogin={shouldShowLogin}>
        <Box sx={{ position: "sticky", top: -60, zIndex: 2 }}>
          <AppBar position="static">
            <Toolbar sx={{ alignItems: "flex-end" }}>
              <Button
                size="small"
                variant="outlined"
                sx={{ marginBottom: 1 }}
                onClick={onBackClicked}
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
          sx={{
            width: "100%",
            position: "relative",
            overflow: "hidden",
            maxHeight: "360px",
            borderBottom: "1px solid #d6d6d6",
          }}
        >
          <img src={post.pictureLink} alt="post" width="100%" />
          <Box
            sx={{
              background: `${season.primaryColor}d0`,
              position: "absolute",
              top: 320,
              left: 0,
              right: 0,
              padding: "8px 12px",
              color: season.secondaryColor,
            }}
          >
            {post.postTitle}
          </Box>
        </Box>
        <ReferenceSection
          post={post}
          references={references}
          showLogin={showLogin}
        />
        <CommentSection postId={post.$id} showLogin={showLogin} />
      </AppWrapper>
    </ThemeProvider>
  );
};
