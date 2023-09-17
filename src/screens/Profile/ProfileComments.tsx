import { Grid, Typography, Box, Button, Link } from "@mui/material";
import { Link as NavLink } from "react-router-dom";
import { POST } from "../../consts/links.const";
import { replaceRouteParams } from "../../helpers";
import { IComment } from "../../interfaces/comment.interface";
import { useRequestDeleteComment } from "../../requests/useRequestComment";

export const ProfileComments = ({ comments }: { comments?: IComment[] }) => {
  const { mutate: onDelete } = useRequestDeleteComment();

  const deleteComment = (commentId: string) => () => {
    onDelete(commentId);
  };
  return (
    <Grid item xs={12} md={12}>
      {comments?.length ? (
        <Typography variant="h6" component="div">
          Comments
        </Typography>
      ) : null}
      {comments?.map((comment) => (
        <Box
          key={comment.$id}
          sx={{
            display: "flex",
            flexDirection: "column",
            borderRadius: 1,
            border: "1px solid #c4c4c4",
            overflow: "hidden",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Box
              sx={{
                backgroundImage: `url(${comment.post.pictureLink})`,
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "top",
                minWidth: "60px",
                maxWidth: "60px",
                maxHeight: "60px",
                minHeight: "60px",
              }}
            />
            <Link
              underline="hover"
              component={NavLink}
              to={replaceRouteParams(POST, { postId: comment.post.$id })}
              sx={{ flex: 1, paddingLeft: 1 }}
            >
              <Typography variant="h6" component="div">
                {comment.post.postTitle}
              </Typography>
            </Link>
            <Button
              size="small"
              variant="text"
              color="red"
              onClick={deleteComment(comment.$id)}
            >
              Delete
            </Button>
          </Box>
          <Typography variant="body1" component="div" padding={1}>
            {comment.comment}
          </Typography>
        </Box>
      ))}
    </Grid>
  );
};
