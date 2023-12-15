import { Box, IconButton, Typography } from "@mui/material";
import { IPost } from "../../../interfaces/post.interface";
import { IStyling } from "../../../interfaces/styling.interface";
import { Link } from "react-router-dom";
import { replaceRouteParams } from "../../../helpers";
import { POST } from "../../../consts/links.const";
import { Post } from "./Post";
import { DeleteForeverRounded } from "@mui/icons-material";
import { DANGER } from "../../../consts/colors.const";
import { useRequestRemovePostFromStyling } from "../../../requests/useRequestStyling";

export const PostsSection = ({
  post,
  styling,
  isUserCreator,
}: {
  post: IPost;
  styling: IStyling;
  isUserCreator: boolean;
}) => {
  const { mutate } = useRequestRemovePostFromStyling(styling);
  const isMainPost = styling.mainPost?.$id === post.$id;

  const onDelete = (postId: string) => () => {
    mutate(postId);
  };

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
            <Box sx={{ position: "relative" }} key={post.$id}>
              <Link to={replaceRouteParams(POST, { postId: post.$id })}>
                <Post post={post} />
              </Link>
              {isUserCreator ? (
                <IconButton
                  sx={{
                    position: "absolute",
                    right: 0,
                    top: 2,
                    color: `${DANGER} !important`,
                  }}
                  onClick={onDelete(post.$id)}
                >
                  <DeleteForeverRounded />
                </IconButton>
              ) : null}
            </Box>
          );
        })}
      </Box>
    </Box>
  );
};
