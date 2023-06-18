import { useState } from "react";
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  TextField,
} from "@mui/material";
import { useLoaderData } from "react-router-dom";
import { IEntry } from "../../../interfaces/entry.interface";
import { ITimelineEntry } from "../../../interfaces/timelineEntry.interface";
import { ITopic } from "../../../interfaces/topic.interface";
import { IEra } from "../../../interfaces/era.interface";
import { DatePicker } from "@mui/x-date-pickers";
import { requestUodateEra } from "../../../requests";
import { useFirebase } from "../../../hooks";

export const EditEra = () => {
  const { db } = useFirebase();
  const { timeline, entries, topic, era } = useLoaderData() as any as {
    entries: IEntry[];
    timeline: ITimelineEntry[];
    topic: ITopic;
    era: IEra;
  };
  const [open, setOpen] = useState(false);
  const [editableEra, setEditableEra] = useState(era);

  if (!timeline || !entries) return <div>Not found</div>;
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = async () => {
    await requestUodateEra(db, topic.id, editableEra);
    window.location.reload();
    handleClose();
  };

  const onChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditableEra({ ...editableEra, title: e.target.value });
  };

  const onChangeDescription = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditableEra({ ...editableEra, description: e.target.value });
  };

  const onChangeCoverImageUrl = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditableEra({ ...editableEra, coverImageUrl: e.target.value });
  };

  const onChangeStartDate = (date: Date | null) => {
    setEditableEra({ ...editableEra, startDate: date || new Date() });
  };

  const onChangeIsPublic = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditableEra({ ...editableEra, isPublic: !!e.target.value });
  };

  const onChangeAllowSuggestions = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditableEra({ ...editableEra, allowSuggestions: !!e.target.value });
  };

  if (!open)
    return (
      <Button
        variant="contained"
        onClick={handleClickOpen}
        sx={{
          float: "right",
        }}
        color="brown"
      >
        Era Settings
      </Button>
    );

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={4} />
      <Grid item xs={12} md={4}>
        <TextField
          id="title"
          label="Title"
          variant="standard"
          fullWidth
          value={editableEra.title}
          onChange={onChangeTitle}
          sx={{ marginBottom: 2 }}
        />
        <TextField
          id="coverImageUrl"
          label="Cover Image URL"
          variant="standard"
          fullWidth
          value={editableEra.coverImageUrl}
          onChange={onChangeCoverImageUrl}
          sx={{ marginBottom: 2 }}
        />
        <TextField
          id="description"
          label="Description"
          variant="standard"
          fullWidth
          value={editableEra.description}
          onChange={onChangeDescription}
          sx={{ marginBottom: 2 }}
          multiline
          minRows={2}
          maxRows={8}
        />
        <DatePicker
          label="Start Date"
          value={editableEra.startDate}
          onChange={onChangeStartDate}
          sx={{ marginBottom: 2 }}
        />
        <Box sx={{ marginBottom: 2 }}>
          <FormControlLabel
            control={
              <Checkbox
                id="isPublic"
                checked={editableEra.isPublic}
                onChange={onChangeIsPublic}
              />
            }
            label="public"
          />
        </Box>
        <Box sx={{ marginBottom: 2 }}>
          <FormControlLabel
            control={
              <Checkbox
                id="allowSuggestions"
                checked={editableEra.allowSuggestions}
                onChange={onChangeAllowSuggestions}
              />
            }
            label="allow suggestions"
          />
        </Box>
        <Box textAlign="end">
          <Button onClick={handleClose} sx={{ marginRight: 1 }}>
            Cancel
          </Button>
          <Button variant="contained" onClick={handleSave}>
            Save
          </Button>
        </Box>
      </Grid>
      <Grid item xs={12} md={4} />
    </Grid>
  );
};
