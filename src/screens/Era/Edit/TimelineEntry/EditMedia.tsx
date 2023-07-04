import { useState } from "react";
import { ITimelineEntry } from "../../../../interfaces/timelineEntry.interface";
import { Box, Button, TextField } from "@mui/material";

interface IEditMedia {
  entry: ITimelineEntry;
  onChange: (entry: ITimelineEntry) => void;
  onDelete: (entry: ITimelineEntry) => void;
  onMoveDown: (entry: ITimelineEntry) => void;
  onMoveUp: (entry: ITimelineEntry) => void;
}

export const EditMedia = ({
  entry,
  onChange,
  onDelete,
  onMoveDown,
  onMoveUp,
}: IEditMedia) => {
  const [title, setTitle] = useState(entry.title || "");
  const [description, setDescription] = useState(entry.description || "");
  const [link, setLink] = useState(entry.link || "");
  const [order, setOrder] = useState(entry.order || 0);

  const onChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };
  const onChangeDescription = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDescription(e.target.value);
  };
  const onChangeLink = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLink(e.target.value);
  };
  const onChangeOrder = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOrder(parseInt(e.target.value));
  };
  const onHandleChange = () => {
    onChange({
      ...entry,
      title,
      description,
      link,
    });
  };

  const onHandleDelete = () => {
    onDelete(entry);
  };

  const onHandleMoveUp = () => {
    onMoveUp(entry);
  };

  const onHandleMoveDown = () => {
    onMoveDown(entry);
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
      <TextField
        id="order"
        label="Order"
        variant="standard"
        type="number"
        fullWidth
        value={order}
        onChange={onChangeOrder}
        sx={{ marginBottom: 2 }}
      />
      <Button onClick={onHandleChange}>Update</Button>
      <Button onClick={onHandleDelete}>Delete</Button>
      <Button onClick={onHandleMoveUp}>Move Up</Button>
      <Button onClick={onHandleMoveDown}>Move Down</Button>
    </Box>
  );
};
