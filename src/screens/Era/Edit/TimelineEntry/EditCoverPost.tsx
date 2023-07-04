import { useState } from "react";
import { ITimelineEntry } from "../../../../interfaces/timelineEntry.interface";
import { Autocomplete, Box, Button, TextField } from "@mui/material";
import { useLoaderData } from "react-router-dom";
import { IEntry } from "../../../../interfaces/entry.interface";

interface IEditCoverPost {
  entry: ITimelineEntry;
  onChange: (entry: ITimelineEntry) => void;
  onDelete: (entry: ITimelineEntry) => void;
  onMoveDown: (entry: ITimelineEntry) => void;
  onMoveUp: (entry: ITimelineEntry) => void;
}

export const EditCoverPost = ({
  entry,
  onChange,
  onDelete,
  onMoveDown,
  onMoveUp,
}: IEditCoverPost) => {
  const { entries } = useLoaderData() as any as {
    entries: IEntry[];
  };

  const [title, setTitle] = useState(entry.title || "");
  const [description, setDescription] = useState(entry.description || "");
  const [linkedEntryId, setLinkedEntryId] = useState(entry.entryId || "");
  const [order, setOrder] = useState(entry.order || 0);

  const onChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };
  const onChangeDescription = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDescription(e.target.value);
  };
  const onChangeLinkedEntryId = (_: any, value: string | null) => {
    setLinkedEntryId(value || "");
  };
  const onChangeOrder = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOrder(parseInt(e.target.value));
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
      Cover Post: shows a featured entry.
      <TextField
        id="title"
        label="Title"
        variant="standard"
        fullWidth
        value={title}
        onChange={onChangeTitle}
        sx={{ marginBottom: 2 }}
      />
      <TextField
        id="description"
        label="Description"
        variant="standard"
        fullWidth
        value={description}
        onChange={onChangeDescription}
        sx={{ marginBottom: 2 }}
        multiline
        maxRows={4}
      />
      <Autocomplete
        disablePortal
        id="entryId"
        options={entries.map((entry: IEntry) => entry.$id)}
        sx={{ marginBottom: 2 }}
        onChange={onChangeLinkedEntryId}
        defaultValue={linkedEntryId}
        renderInput={(params) => <TextField {...params} label="Entry ID" />}
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
