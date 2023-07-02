import { Box, Button, Dialog, DialogTitle, TextField } from "@mui/material";
import { useState } from "react";
import { useLoaderData } from "react-router-dom";
import { IEra } from "../../../../interfaces/era.interface";
import { requestCreateLink } from "../../../../requests";

interface SimpleDialogProps {
  open: boolean;
  onClose: () => void;
}

export const CreateLinkDialog = ({ onClose, open }: SimpleDialogProps) => {
  const { era } = useLoaderData() as any as {
    era: IEra;
  };
  const [title, setTitle] = useState("");
  const [link, setLink] = useState("");

  const handleClose = () => {
    onClose();
  };

  const onChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };
  const onChangeLink = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLink(e.target.value);
  };

  const createLink = () => {
    if (!title) return;
    requestCreateLink({
      eraId: era.id,
      title,
      link,
    });
    setTitle("");
    setLink("");
    onClose();
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle variant="h5">Create New Link</DialogTitle>
      <Box
        display="flex"
        flexDirection="column"
        paddingX={4}
        paddingBottom={6}
        alignItems="center"
      >
        <TextField
          id="standard-basic"
          label="Title"
          variant="standard"
          fullWidth
          value={title}
          onChange={onChangeName}
          sx={{ marginBottom: 2 }}
        />
        <TextField
          id="standard-basic"
          label="Link"
          variant="standard"
          value={link}
          onChange={onChangeLink}
          fullWidth
          sx={{ marginBottom: 2 }}
        />
        <Button variant="contained" onClick={createLink} fullWidth>
          Submit
        </Button>
      </Box>
    </Dialog>
  );
};
