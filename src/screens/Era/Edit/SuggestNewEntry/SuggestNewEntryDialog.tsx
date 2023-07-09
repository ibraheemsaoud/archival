import { DatePicker } from "@mui/x-date-pickers";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { useState } from "react";
import { requestCreateEntry } from "../../../../requests";
import { useLoaderData } from "react-router-dom";
import { IEra } from "../../../../interfaces/era.interface";
import { UploadImage } from "../../../../components/UploadImage";

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
  const [file, setFile] = useState<File | null>(null);
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
  const onChangeFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    setFile(e.target.files[0]);
    setPictureUrl(URL.createObjectURL(e.target.files[0]));
  };
  const onRemoveFile = () => {
    setFile(null);
    setPictureUrl("");
  };

  const createEntry = () => {
    if (!title || !date) return;
    requestCreateEntry(era.id, file, {
      title,
      link,
      text,
      timestamp: date,
      pictureUrl,
    });
    setTitle("");
    setLink("");
    setText("");
    setFile(null);
    setPictureUrl("");
    setDate(new Date());
    onClose();
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      <Box>
        <DialogTitle variant="h5">Suggest New Entry</DialogTitle>
        <DialogContent>
          <Box
            display="flex"
            flexDirection="column"
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
              inputProps={{
                maxLength: 500,
              }}
            />
            <UploadImage  
              onChangeFile={onChangeFile}
              onRemoveFile={onRemoveFile}
              pictureUrl={pictureUrl}
              file={file}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={createEntry}>
            Submit
          </Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
};
