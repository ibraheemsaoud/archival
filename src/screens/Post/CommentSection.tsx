import { ChevronRight } from "@mui/icons-material";
import { Box, TextField, Button, Typography } from "@mui/material";
import { IComment } from "../../interfaces/comment.interface";
import { useState } from "react";
import {
  useRequestComments,
  useRequestCreateComment,
} from "../../requests/useRequestComment";
import { useUser } from "../../hooks";

export const CommentSection = ({ postId }: { postId: string }) => {
  const { data: comments } = useRequestComments(postId);
  const { mutate } = useRequestCreateComment(postId);
  const { user } = useUser();

  const [comment, setComment] = useState("");

  const onSubmit = () => {
    mutate({
      comment,
      postId,
      userId: user?.$id || "",
    });
    setComment("");
  };

  return (
    <Box>
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
            marginBottom={2}
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
    </Box>
  );
};
