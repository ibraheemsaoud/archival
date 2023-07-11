import { useEffect, useState } from "react";
import { ITimelineEntry } from "../../../../interfaces/timelineEntry.interface";
import { Box, Button } from "@mui/material";
import {
  H3TextField,
  H5TextField,
  SingleEntryAutocomplete,
} from "../../../../components";
import { Body1TextField } from "../../../../components/Body1TextField";
import { CoverPost } from "../../../../components/Timeline/components";

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
  const [title, setTitle] = useState(entry.title || "");
  const [description, setDescription] = useState(entry.description || "");
  const [linkedEntryId, setLinkedEntryId] = useState(entry.entryId || "");
  const [order, setOrder] = useState(entry.order || 0);

  useEffect(() => {
    setTitle(entry.title || "");
    setDescription(entry.description || "");
    setLinkedEntryId(entry.entryId || "");
    setOrder(entry.order || 0);
  }, [entry]);

  const onChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };
  const onChangeDescription = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDescription(e.target.value);
  };
  const onChangeLinkedEntryId = (value?: string) => {
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
      order,
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
    <Box sx={{ marginY: 2 }}>
      <H3TextField
        id="title"
        placeholder="Title"
        variant="standard"
        fullWidth
        value={title}
        onChange={onChangeTitle}
      />
      <Body1TextField
        id="description"
        placeholder="Description"
        variant="standard"
        fullWidth
        value={description}
        onChange={onChangeDescription}
        multiline
        maxRows={4}
      />
      <SingleEntryAutocomplete
        id="entryId"
        sx={{ marginY: 2 }}
        onChange={onChangeLinkedEntryId}
        defaultValue={linkedEntryId}
      />
      <CoverPost entry={{ ...entry, entryId: linkedEntryId }} minimalDisplay />
      <H5TextField
        id="order"
        placeholder="Order"
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
