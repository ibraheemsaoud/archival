import {
  AppBar,
  Box,
  Button,
  TextField,
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
import { SEASON } from "../../consts/links.const";
import { useNavigation, useUser } from "../../hooks";
import { replaceRouteParams } from "../../helpers";
import { useRequestBrand } from "../../requests/useRequestBrand";
import { useRequestSeason } from "../../requests/useRequestSeason";
import { theme } from "../../theme";
import { ChevronRight } from "@mui/icons-material";
import {
  useRequestComments,
  useRequestCreateComment,
} from "../../requests/useRequestComment";
import { useState } from "react";

export const Post = () => {
  const [comment, setComment] = useState("");
  const { onBack } = useNavigation();
  const { references, post } = useLoaderData() as any as {
    references?: IReference[];
    post?: IPost;
    comments?: IComment[];
  };
  const { data: comments } = useRequestComments(post?.$id || "");
  const { mutate } = useRequestCreateComment(post?.$id || "");
  const { user } = useUser();

  const { data: season, isLoading: isSeasonLoading } = useRequestSeason(
    post?.seasonId
  );
  const { data: brand, isLoading: isBrandLoading } = useRequestBrand(
    season?.brandId
  );

  if (isSeasonLoading || isBrandLoading) return <div>Loading...</div>;
  if (!post || !season || !brand) return <div>Not found</div>;

  const modedTheme = theme("light", season.primaryColor, season.secondaryColor);
  const onBackClicked = () => {
    onBack(replaceRouteParams(SEASON, { seasonId: season.slug }));
  };
  const onSubmit = () => {
    mutate({
      comment,
      postId: post.$id || "",
      userId: user?.$id || "",
    });
    setComment("");
  };

  return (
    <ThemeProvider theme={modedTheme}>
      <AppWrapper>
        <Box>
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
        {references?.length ? (
          <Box
            sx={{
              borderTop: "1px solid #d6d6d6",
            }}
          >
            <Typography
              variant="h6"
              component="div"
              marginX={1}
              sx={{ textDecoration: "underline" }}
            >
              References
            </Typography>
            {references?.map((reference: IReference) => {
              return <Reference reference={reference} key={reference.$id} />;
            })}
          </Box>
        ) : null}
        {comments?.length ? (
          <Box
            sx={{
              borderTop: "1px solid #d6d6d6",
            }}
          >
            <Typography
              variant="h6"
              component="div"
              marginX={1}
              sx={{ textDecoration: "underline" }}
            >
              Discussions
            </Typography>
          </Box>
        ) : null}
        <Box>
          {comments?.map((comment: IComment) => {
            return (
              <Box
                key={comment.$id}
                display="flex"
                sx={{
                  borderBottom: "1px solid #d6d6d6",
                  paddingBottom: "4px",
                  margin: 1,
                }}
              >
                <Box
                  sx={{
                    background: "#d6d6d6",
                    width: "40px",
                    height: "40px",
                    borderRadius: "40px",
                  }}
                />
                <Box
                  sx={{
                    borderRadius: "4px",
                    padding: "0px 8px 0px 8px",
                    fontSize: "14px",
                    whiteSpace: "pre-wrap",
                    lineHeight: "20px",
                  }}
                >
                  {comment.comment}
                </Box>
              </Box>
            );
          })}
        </Box>
        <Box position="relative" marginTop={4}>
          <TextField
            id="filled-multiline-static"
            label="Comment"
            multiline
            rows={3}
            variant="filled"
            sx={{
              width: "-webkit-fill-available",
              margin: 1,
            }}
            color="primary"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <Button
            size="small"
            sx={{
              borderRadius: 40,
              position: "absolute",
              bottom: 16,
              right: 16,
              padding: "4px",
              minWidth: "40px",
              lineHeight: "40px",
              height: "40px",
            }}
            variant="contained"
            color="primary"
            onClick={onSubmit}
          >
            <ChevronRight />
          </Button>
        </Box>
      </AppWrapper>
    </ThemeProvider>
  );
};
