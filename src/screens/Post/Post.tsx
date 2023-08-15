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
import { IReference } from "../../interfaces/reference.interface";
import { Reference } from "./Refernce";
import { IComment } from "../../interfaces/comment.interface";
import { POST } from "../../consts/links.const";
import { useNavigation } from "../../hooks";
import { replaceRouteParams } from "../../helpers";
import { useRequestBrand } from "../../requests/useRequestBrand";
import { useRequestSeason } from "../../requests/useRequestSeason";
import { theme } from "../../theme";

export const Post = () => {
  const { onBack } = useNavigation();
  const { references, post, comments } = useLoaderData() as any as {
    references?: IReference[];
    post?: IPost;
    comments?: IComment[];
  };

  const { data: season, isLoading: isSeasonLoading } = useRequestSeason(
    post?.seasonId
  );
  const { data: brand, isLoading: isBrandLoading } = useRequestBrand(
    season?.brandId
  );

  if (isSeasonLoading || isBrandLoading) return <div>Loading...</div>;
  if (!post || !season || !brand) return <div>Not found</div>;

  const modedTheme = theme("light", season.primaryColor, season.secondaryColor);

  return (
    <ThemeProvider theme={modedTheme}>
      <AppWrapper>
        <Box sx={{ flexGrow: 1, marginBottom: 2 }}>
          <AppBar position="static">
            <Toolbar sx={{ alignItems: "flex-end" }}>
              <Button
                size="small"
                variant="outlined"
                sx={{ marginBottom: 1 }}
                onClick={() =>
                  onBack(replaceRouteParams(POST, { postId: post.$id }))
                }
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
        {references?.length ? (
          <Box>
            <Typography
              variant="h6"
              component="div"
              marginX={1}
              marginTop={2}
              sx={{ textDecoration: "underline" }}
            >
              References
            </Typography>
            {references?.map((reference: IReference) => {
              return <Reference reference={reference} key={reference.$id} />;
            })}
          </Box>
        ) : null}
        <Box
          sx={{
            background: "#dddddd",
            height: "auto",
            padding: "20px",
          }}
        >
          {comments?.map((comment: IComment) => {
            return (
              <Box
                sx={{
                  borderRadius: "4px",
                  background: "white",
                  padding: "8px 8px 4px 8px",
                  margin: "16px 72px 16px 16px",
                  color: "black",
                  fontSize: "14px",
                  whiteSpace: "pre-wrap",
                }}
              >
                {comment.comment}
              </Box>
            );
          })}
        </Box>
      </AppWrapper>
    </ThemeProvider>
  );
};
