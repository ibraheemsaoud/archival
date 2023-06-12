import { Button } from "@mui/material";
import { useRoles } from "../../hooks";
import { useState } from "react";
import { CreateNewEntryDialog } from "./CreateNewEntryDialog";

export const CreateNewEntry = ({ eraId }: { eraId: string }) => {
  const [open, setOpen] = useState(false);
  const { hasEditAccess, isMember } = useRoles(eraId);

  if (!isMember && !hasEditAccess) return null;

  const buttonText = hasEditAccess ? "Create New Entry" : "Suggest New Entry";

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
        {buttonText}
      </Button>
      <CreateNewEntryDialog open={open} onClose={handleClose} />
    </>
  );
};
