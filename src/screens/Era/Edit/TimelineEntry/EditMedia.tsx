import { useState } from "react";
import { IMedia } from "../../../../interfaces/timelineEntry.interface";
import { Box, Button, TextField } from "@mui/material";

interface IEditMedia {
  entry: IMedia;
  onChange: (entry: IMedia) => void;
  onDelete: (entry: IMedia) => void;
}

export const EditMedia = ({ entry, onChange, onDelete }: IEditMedia) => {
  const [title, setTitle] = useState(entry.title || "");
  const [description, setDescription] = useState(entry.description || "");
  const [link, setLink] = useState(entry.link || "");

  const onChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };
  const onChangeDescription = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDescription(e.target.value);
  };
  const onChangeLink = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLink(e.target.value);
  };
  const onHandleChange = () => {
    onChange({
      ...entry,
      title,
      description,
      link,
      entryType: "image",
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
      Media Element: shows a big picture.
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
        label="Link"
        variant="standard"
        fullWidth
        value={link}
        onChange={onChangeLink}
        sx={{ marginBottom: 2 }}
      />
      <Button onClick={onHandleChange}>Update</Button>
      <Button onClick={onHandleDelete}>Delete</Button>
    </Box>
  );
};
