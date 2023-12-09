import { Box, Typography } from "@mui/material";
import { IPost } from "../../../interfaces/post.interface";
import { IStyling } from "../../../interfaces/styling.interface";
import { Link } from "react-router-dom";
import { replaceRouteParams } from "../../../helpers";
import { POST } from "../../../consts/links.const";
import { Post } from "./Post";

export const PostsSection = ({
  post,
  styling,
}: {
  post: IPost;
  styling: IStyling;
}) => {
  const isMainPost = styling.mainPost?.$id === post.$id;

  return (
    <Box
      sx={{
        borderTop: `1px solid ${post.season?.primaryColor}`,
      }}
    >
      <Typography
        variant="h6"
        component="div"
        marginX={1}
        sx={{ textDecoration: "underline" }}
      >
        Items and Inspirations
      </Typography>
      <Box
        sx={{
          display: "flex",
          overflow: "auto",
          marginX: 1,
        }}
      >
        {!isMainPost ? (
          <Link
            to={replaceRouteParams(POST, { postId: post.$id })}
            key={post.$id}
          >
            <Post post={post} />
          </Link>
        ) : null}
        {styling.posts?.map((post: IPost) => {
          return (
            <Link
              to={replaceRouteParams(POST, { postId: post.$id })}
              key={post.$id}
            >
              <Post post={post} />
            </Link>
          );
        })}
      </Box>
    </Box>
  );
};
