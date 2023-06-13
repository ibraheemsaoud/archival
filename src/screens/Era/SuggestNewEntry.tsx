import { Button } from "@mui/material";
import { useState } from "react";
import { SuggestNewEntryDialog } from "./SuggestNewEntryDialog";

export const SuggestNewEntry = ({ eraId }: { eraId: string }) => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
      <Button
        sx={{ position: "fixed", bottom: 4, right: 2 }}
        variant="contained"
        onClick={handleClickOpen}
      >
        Suggest New Entry
      </Button>
      <SuggestNewEntryDialog open={open} onClose={handleClose} eraId={eraId} />
    </>
  );
};
