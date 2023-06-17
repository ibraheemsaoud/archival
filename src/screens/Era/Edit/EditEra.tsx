import { useState } from "react";
import { Button, Dialog, DialogTitle, Grid, Typography } from "@mui/material";
import { IEra } from "../../../interfaces/era.interface";
import { useLoaderData } from "react-router-dom";
import { IEntry } from "../../../interfaces/entry.interface";
import { EntryCard } from "../../../components/Timeline/components/EntryCard";
import { TimelineEditor } from "./TimelineEditor";

export const EditEra = ({ era }: { era: IEra }) => {
  const { entries } = useLoaderData() as any as {
    entries: IEntry[];
  };
  const [open, setOpen] = useState(false);

  if (!entries) return <div>Not found</div>;
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
      <Button
        sx={{ position: "fixed", bottom: 42, right: 2 }}
        variant="contained"
        onClick={handleClickOpen}
      >
        Edit Era
      </Button>

      <Dialog onClose={handleClose} open={open} fullScreen>
        <DialogTitle variant="h5">
          Era Editor
          <br /> Sorry for this mess, I'm working to fix it
        </DialogTitle>
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Typography variant="h5">Timeline</Typography>
            <TimelineEditor era={era} onClose={handleClose} />
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="h5">Entries</Typography>
            <Grid container spacing={2}>
              {entries.map((entry) => (
                <Grid item xs={6} key={entry.id}>
                  <Typography variant="h5">id: {entry.id}</Typography>
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
