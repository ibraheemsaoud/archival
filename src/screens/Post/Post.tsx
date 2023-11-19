import { Box, ThemeProvider } from "@mui/material";
import { useLoaderData } from "react-router-dom";
import { IPost } from "../../interfaces/post.interface";
import { AppWrapper, TopToolbar } from "../../components";
import { SEASON } from "../../consts/links.const";
import { replaceRouteParams } from "../../helpers";
import { theme } from "../../theme";
import { CommentSection } from "./CommentSection";
import { ReferenceSection } from "./ReferencesSection";
import { useState } from "react";
import { StylingSection } from "./Styling/StylingSection";

export const Post = () => {
  const [shouldShowLogin, setShowLogin] = useState(false);
  const { post } = useLoaderData() as any as {
    post?: IPost;
  };

  console.log("post", post);

  const season = post?.season;

  console.log("season", season);

  const brand = season?.brand;
  const stylings = post?.stylings || [];
  const references = post?.references || [];

  if (!post || !brand) return <div>Not found</div>;

  const modedTheme = theme("light", season.primaryColor, season.secondaryColor);

  const showLogin = () => {
    setShowLogin(false);
    setTimeout(() => {
      setShowLogin(true);
    });
  };

  const backAddress = replaceRouteParams(SEASON, { seasonId: season.slug });

  return (
    <ThemeProvider theme={modedTheme}>
      <AppWrapper shouldLogin={shouldShowLogin}>
        <TopToolbar
          backAddress={backAddress}
          logo={brand.logoLink}
          title={season.name}
        />
        <Box
          sx={{
            width: "100%",
            position: "relative",
            overflow: "hidden",
            maxHeight: "360px",
            borderBottom: `1px solid ${season?.secondaryColor}`,
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
        <StylingSection post={post} stylings={stylings} showLogin={showLogin} />
        <ReferenceSection
          post={post}
          references={references}
          showLogin={showLogin}
        />
        <CommentSection post={post} showLogin={showLogin} />
      </AppWrapper>
    </ThemeProvider>
  );
};
