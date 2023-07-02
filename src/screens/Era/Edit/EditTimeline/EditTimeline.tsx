import { useState } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  Grid,
  Typography,
} from "@mui/material";
import { useLoaderData } from "react-router-dom";
import { IEntry } from "../../../../interfaces/entry.interface";
import { EntryCard } from "../../../../components/Timeline/components/EntryCard";
import { TimelineEditor } from "./TimelineEditor";
import { ITimelineEntry } from "../../../../interfaces/timelineEntry.interface";
import { IEra } from "../../../../interfaces/era.interface";

export const EditTimeline = () => {
  const { timeline, entries, era } = useLoaderData() as any as {
    entries: IEntry[];
    timeline: ITimelineEntry[];
    era: IEra;
  };
  const [open, setOpen] = useState(false);

  if (!timeline || !entries) return <div>Not found</div>;
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    window.location.reload();
    setOpen(false);
  };

  return (
    <>
      <Button variant="contained" onClick={handleClickOpen}>
        Edit timeline
      </Button>

      <Dialog onClose={handleClose} open={open} fullScreen>
        <Box display="flex" justifyContent="space-between">
          <DialogTitle variant="h5">
            Era Editor
            <br /> Sorry for this mess, I'm working to fix it
          </DialogTitle>
          <Button onClick={handleClose} sx={{ marginRight: 2 }}>
            Close
          </Button>
        </Box>
        <Grid container spacing={2} paddingX={2}>
          <Grid item xs={12} md={10}>
            <Typography variant="h5">Timeline</Typography>
            <TimelineEditor eraId={era.id} />
          </Grid>
          <Grid item xs={12} md={2}>
            <Typography variant="h5">Entries</Typography>
            <Grid container>
              {entries.map((entry) => (
                <Grid item xs={12} key={entry.$id}>
                  <Typography variant="h5">id: {entry.$id}</Typography>
                  <EntryCard entry={entry} />
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </Dialog>
    </>
  );
};
