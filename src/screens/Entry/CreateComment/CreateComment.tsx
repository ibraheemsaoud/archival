import { Box, Button, TextField } from "@mui/material";
import { ChangeEvent, useState } from "react";
import { useRequestCreateComment } from "../../../requests";
import { useUser } from "../../../hooks";

export const CreateComment = ({ entryId }: { entryId: string }) => {
  const [comment, setComment] = useState("");
  const { user } = useUser();

  const { mutate } = useRequestCreateComment();

  const handleCommentChange = (e: ChangeEvent<HTMLInputElement>) => {
    setComment(e.target.value);
  };

  const handleSubmit = () => {
    mutate({ entryId, userId: user?.$id!, message: comment });
    setComment("");
  };

  return (
    <Box display="flex" alignItems="flex-end">
      <TextField
        label="Comment"
        multiline
        rows={4}
        fullWidth
        value={comment}
        onChange={handleCommentChange}
      />
      <Button
        variant="contained"
        onClick={handleSubmit}
        sx={{
          marginLeft: 2,
        }}
      >
        Comment
      </Button>
    </Box>
  );
};
