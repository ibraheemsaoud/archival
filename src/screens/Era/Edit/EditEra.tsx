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
import { requestUpdateEra } from "../../../requests";

export const EditEra = () => {
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
    const { error } = await requestUpdateEra(topic.id, editableEra);
    if (error) {
      console.error(error);
    } else {
      window.location.reload();
      handleClose();
    }
  };

  const onChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditableEra({ ...editableEra, title: e.target.value });
  };

  const onChangeAccentColor = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditableEra({ ...editableEra, accentColor: e.target.value });
  };

  const onChangeDescription = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditableEra({ ...editableEra, description: e.target.value });
  };

  const onChangeCoverImageUrl = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditableEra({ ...editableEra, coverImageUrl: e.target.value });
  };

  const onChangeIsPublic = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditableEra({ ...editableEra, isPublic: !!e.target.value });
  };

  const onChangeDisableSuggestions = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setEditableEra({ ...editableEra, disableSuggestions: !!e.target.value });
  };

  if (!open)
    return (
      <Box display="flex" justifyContent="flex-end">
        <Button variant="contained" onClick={handleClickOpen} color="brown">
          Era Settings
        </Button>
      </Box>
    );

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={3} />
      <Grid item xs={12} md={6}>
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
          id="standard-basic"
          label="Accent Color"
          variant="standard"
          value={editableEra.accentColor}
          onChange={onChangeAccentColor}
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
                id="disableSuggestions"
                checked={editableEra.disableSuggestions}
                onChange={onChangeDisableSuggestions}
              />
            }
            label="disable suggestions"
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
