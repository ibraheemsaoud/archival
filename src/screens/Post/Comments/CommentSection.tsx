import { ChevronRight } from "@mui/icons-material";
import { Box, TextField, Button, Typography } from "@mui/material";
import { IComment } from "../../../interfaces/comment.interface";
import { useState } from "react";
import {
  useRequestComments,
  useRequestCreateComment,
  useRequestDeleteComment,
} from "../../../requests/useRequestComment";
import { useUser } from "../../../hooks";
import { Comment } from "./Comment";
import { IPost } from "../../../interfaces/post.interface";

export const CommentSection = ({
  post,
  showLogin,
}: {
  post: IPost;
  showLogin: () => void;
}) => {
  const { data: comments } = useRequestComments(post.$id);
  const { mutate: onComment } = useRequestCreateComment(post.$id);
  const { mutate: onDelete } = useRequestDeleteComment(post.$id);
  const { user } = useUser();

  const [comment, setComment] = useState("");

  const onSubmit = () => {
    if (!user) {
      showLogin();
      return;
    }
    onComment({
      comment,
      post: post.$id,
      userId: user.$id || "",
    });
    setComment("");
  };

  return (
    <Box>
      {comments?.length ? (
        <Box
          sx={{
            borderTop: `1px solid ${post.season.secondaryColor}`,
          }}
        >
          <Typography
            variant="h6"
            component="div"
            margin={2}
          >
            Discussions
          </Typography>
        </Box>
      ) : null}
      <Box>
        {comments?.map((comment: IComment) => {
          return (
            <Comment key={comment.$id} comment={comment} onDelete={onDelete} />
          );
        })}
      </Box>
      <Box position="relative" marginTop={4}>
        <TextField
          id="comment"
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
    </Box>
  );
};
