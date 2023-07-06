import { useState } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { useLoaderData } from "react-router-dom";
import { IEntry } from "../../../../interfaces/entry.interface";
import { EntryCard } from "../../../../components/Timeline/components/EntryCard";
import { TimelineEditor } from "./TimelineEditor";
import {
  ILink,
  ITimelineEntry,
} from "../../../../interfaces/timelineEntry.interface";
import { IEra } from "../../../../interfaces/era.interface";

export const EditTimeline = () => {
  const { timeline, entries, era, links } = useLoaderData() as any as {
    entries: IEntry[];
    timeline: ITimelineEntry[];
    era: IEra;
    links: ILink[];
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

      <Dialog onClose={handleClose} open={open} fullScreen sx={{ margin: 3 }}>
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
                  <TextField
                    id="entryId"
                    label="Id"
                    variant="standard"
                    fullWidth
                    defaultValue={entry.$id}
                    disabled
                    sx={{ marginBottom: 2 }}
                  />
                  <EntryCard entry={entry} />
                </Grid>
              ))}
              <Typography variant="h5">Links</Typography>
              {links.map((link) => (
                <Grid item xs={12} key={link.$id}>
                  <TextField
                    id="linkId"
                    label="Id"
                    variant="standard"
                    fullWidth
                    defaultValue={link.$id}
                    disabled
                    sx={{ marginBottom: 2 }}
                  />
                  <TextField
                    id="linkTitle"
                    label="Title"
                    variant="standard"
                    fullWidth
                    defaultValue={link.title}
                    disabled
                    sx={{ marginBottom: 2 }}
                  />
                  <TextField
                    id="LinkLink"
                    label="Link"
                    variant="standard"
                    fullWidth
                    defaultValue={link.link}
                    disabled
                    sx={{ marginBottom: 2 }}
                  />
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </Dialog>
    </>
  );
};
