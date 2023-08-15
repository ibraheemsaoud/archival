import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material";
import { useLoaderData } from "react-router-dom";
import { IPost } from "../../interfaces/post.interface";
import { AppWrapper } from "../../components";
import { IReference } from "../../interfaces/reference.interface";
import { Reference } from "./Refernce";
import { IComment } from "../../interfaces/comment.interface";
import { POST } from "../../consts/links.const";
import { useNavigation } from "../../hooks";
import { replaceRouteParams } from "../../helpers";

export const Post = () => {
  const { onBack } = useNavigation();
  const { references, post, comments } = useLoaderData() as any as {
    references?: IReference[];
    post?: IPost;
    comments?: IComment[];
  };

  if (!post) return <div>Loading...</div>;

  return (
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
              <Typography variant="h6" component="div">
                {post.postTitle}
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
      </Box>
      <Box>
        {references?.map((reference: IReference) => {
          return <Reference reference={reference} key={reference.$id} />;
        })}
      </Box>
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
  );
};
