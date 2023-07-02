import { Button } from "@mui/material";
import { useState } from "react";
import { CreateLinkDialog } from "./CreateLinkDialog";

export const CreateLink = () => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
      <Button variant="contained" onClick={handleClickOpen}>
        CreateLink
      </Button>
      <CreateLinkDialog open={open} onClose={handleClose} />
    </>
  );
};
