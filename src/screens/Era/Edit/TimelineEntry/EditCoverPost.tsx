import { useState } from "react";
import { ICoverPost } from "../../../../interfaces/timelineEntry.interface";
import { Box, Button, TextField } from "@mui/material";

interface IEditCoverPost {
  entry: ICoverPost;
  onChange: (entry: ICoverPost) => void;
  onDelete: (entry: ICoverPost) => void;
}

export const EditCoverPost = ({
  entry,
  onChange,
  onDelete,
}: IEditCoverPost) => {
  const [title, setTitle] = useState(entry.title || "");
  const [description, setDescription] = useState(entry.description || "");
  const [linkedEntryId, setLinkedEntryId] = useState(entry.entryId || "");

  const onChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };
  const onChangeDescription = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDescription(e.target.value);
  };
  const onChangeLinkedEntryId = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLinkedEntryId(e.target.value);
  };
  const onHandleChange = () => {
    onChange({
      ...entry,
      title,
      description,
      entryId: linkedEntryId,
    });
  };

  const onHandleDelete = () => {
    onDelete(entry);
  };

  return (
    <Box
      sx={(theme) => ({
        margin: 1,
        paddingX: 1,
        paddingY: 2,
        border: `1px solid ${theme.palette.divider}`,
        borderRadius: 1,
      })}
    >
      Cover Post: shows a featured entry.
      <TextField
        id="standard-basic"
        label="Title"
        variant="standard"
        fullWidth
        value={title}
        onChange={onChangeTitle}
        sx={{ marginBottom: 2 }}
      />
      <TextField
        id="standard-basic"
        label="Description"
        variant="standard"
        fullWidth
        value={description}
        onChange={onChangeDescription}
        sx={{ marginBottom: 2 }}
        multiline
        maxRows={4}
      />
      <TextField
        id="standard-basic"
        label="Entry ID"
        variant="standard"
        fullWidth
        value={linkedEntryId}
        onChange={onChangeLinkedEntryId}
        sx={{ marginBottom: 2 }}
      />
      <Button onClick={onHandleChange}>Update</Button>
      <Button onClick={onHandleDelete}>Delete</Button>
    </Box>
  );
};
