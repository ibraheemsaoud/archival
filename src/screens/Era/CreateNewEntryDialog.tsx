import { DatePicker } from "@mui/x-date-pickers";
import { Box, Button, Dialog, DialogTitle, TextField } from "@mui/material";
import { useState } from "react";
import { useRequestCreateEntry } from "../../requests";
import { useLoaderData } from "react-router-dom";
import { IEra } from "../../interfaces/era.interface";
import { useUser } from "../../hooks";

interface SimpleDialogProps {
  open: boolean;
  onClose: () => void;
}

export const CreateNewEntryDialog = ({ onClose, open }: SimpleDialogProps) => {
  const { era } = useLoaderData() as any as {
    era: IEra;
  };
  const { user } = useUser();

  const [title, setTitle] = useState("");
  const [link, setLink] = useState("");
  const [text, setText] = useState("");
  const [date, setDate] = useState<Date | null>(new Date());

  const { mutate } = useRequestCreateEntry();

  const handleClose = () => {
    onClose();
  };

  const onChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };
  const onChangeLink = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLink(e.target.value);
  };
  const onChangeText = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };
  const onChangeDate = (date: Date | null) => {
    setDate(date);
  };

  const createEntry = () => {
    if (!title || !date) return;
    mutate({
      title,
      text,
      link,
      timestamp: date,
      eraId: era.id,
      userId: user.id,
    });
    setTitle("");
    setLink("");
    setText("");
    setDate(new Date());
    onClose();
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle variant="h5">Create New Entry</DialogTitle>
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
        <DatePicker
          sx={{ marginBottom: 2 }}
          label="Choose entry date"
          onChange={onChangeDate}
          value={date}
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
        <TextField
          id="standard-basic"
          label="Text"
          variant="standard"
          value={text}
          onChange={onChangeText}
          sx={{ marginBottom: 2 }}
        />
        <Button variant="contained" onClick={createEntry} fullWidth>
          Create
        </Button>
      </Box>
    </Dialog>
  );
};
