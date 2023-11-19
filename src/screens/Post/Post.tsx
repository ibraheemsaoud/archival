import { Box, ThemeProvider } from "@mui/material";
import { useLoaderData } from "react-router-dom";
import { AppWrapper, Error, Loader, TopToolbar } from "../../components";
import { SEASON } from "../../consts/links.const";
import { replaceRouteParams } from "../../helpers";
import { theme } from "../../theme";
import { CommentSection } from "./CommentSection";
import { ReferenceSection } from "./ReferencesSection";
import { useState } from "react";
import { StylingSection } from "./Styling/StylingSection";
import { useRequestPost } from "../../requests/useRequestPost";

export const Post = () => {
  const [shouldShowLogin, setShowLogin] = useState(false);
  const { postId } = useLoaderData() as any as {
    postId: string;
  };
  const { data: post, error } = useRequestPost(postId);

  if (!postId) return <div>Missing post id</div>;
  if (!post) return <Loader />;

  const season = post?.season;
  const brand = season?.brand;
  const stylings = post?.stylings || [];
  const references = post?.references || [];

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
        <Error error={error} />
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
