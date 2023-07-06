import { DatePicker } from "@mui/x-date-pickers";
import { Box, Button, Dialog, DialogTitle, TextField } from "@mui/material";
import { useState } from "react";
import { requestCreateEntry } from "../../../../requests";
import { useLoaderData } from "react-router-dom";
import { IEra } from "../../../../interfaces/era.interface";

interface SimpleDialogProps {
  open: boolean;
  onClose: () => void;
}

export const SuggestNewEntryDialog = ({ onClose, open }: SimpleDialogProps) => {
  const { era } = useLoaderData() as any as {
    era: IEra;
  };
  const [title, setTitle] = useState("");
  const [link, setLink] = useState("");
  const [text, setText] = useState("");
  const [pictureUrl, setPictureUrl] = useState("");
  const [date, setDate] = useState<Date | null>(new Date());

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
  const onChangePictureUrl = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPictureUrl(e.target.value);
  };

  const createEntry = () => {
    if (!title || !date) return;
    requestCreateEntry(era.id, {
      title,
      link,
      text,
      timestamp: date,
      pictureUrl,
    });
    setTitle("");
    setLink("");
    setText("");
    setPictureUrl("");
    setDate(new Date());
    onClose();
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle variant="h5">Suggest New Entry</DialogTitle>
      <Box
        display="flex"
        flexDirection="column"
        paddingX={4}
        paddingBottom={6}
        alignItems="center"
      >
        <TextField
          id="title"
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
          id="link"
          label="Link"
          variant="standard"
          value={link}
          onChange={onChangeLink}
          fullWidth
          sx={{ marginBottom: 2 }}
        />
        <TextField
          id="text"
          label="Text"
          variant="standard"
          value={text}
          onChange={onChangeText}
          sx={{ marginBottom: 2 }}
          fullWidth
        />
        <TextField
          id="pictureURL"
          label="Picture URL"
          variant="standard"
          value={pictureUrl}
          onChange={onChangePictureUrl}
          sx={{ marginBottom: 2 }}
          fullWidth
        />
        <Button variant="contained" onClick={createEntry} fullWidth>
          Submit
        </Button>
      </Box>
    </Dialog>
  );
};
