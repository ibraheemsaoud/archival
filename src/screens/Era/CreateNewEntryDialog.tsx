import { DatePicker } from "@mui/x-date-pickers";
import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
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

  const [entryType, setEntryType] = useState("Link");

  const [title, setTitle] = useState("");
  const [link, setLink] = useState("");
  const [text, setText] = useState("");
  const [date, setDate] = useState<Date | null>(new Date());

  const { mutate } = useRequestCreateEntry();

  const handleClose = () => {
    onClose();
  };
  const handleTypeChange = (
    _: React.MouseEvent<HTMLElement>,
    newAlignment: string
  ) => {
    setEntryType(newAlignment);
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
    if (!title || !date || !entryType) return;
    if (entryType === "Link") {
      mutate({
        title,
        link,
        timestamp: date,
        eraId: era.id,
        variant: "link",
        userId: user.id,
      });
    } else if (entryType === "Image") {
    } else if (entryType === "Text") {
      mutate({
        title,
        text,
        timestamp: date,
        eraId: era.id,
        variant: "text",
        userId: user.id,
      });
    }
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
        <ToggleButtonGroup
          color="primary"
          value={entryType}
          exclusive
          onChange={handleTypeChange}
          aria-label="Platform"
          fullWidth
          size="small"
          sx={{ marginBottom: 2 }}
        >
          <ToggleButton value="Link">Link</ToggleButton>
          <ToggleButton value="Image">Image</ToggleButton>
          <ToggleButton value="Text">Text</ToggleButton>
        </ToggleButtonGroup>
        {entryType === "Link" && (
          <TextField
            id="standard-basic"
            label="Link"
            variant="standard"
            value={link}
            onChange={onChangeLink}
            fullWidth
            sx={{ marginBottom: 2 }}
          />
        )}
        {entryType === "Text" && (
          <TextField
            id="standard-basic"
            label="Text"
            variant="standard"
            value={text}
            onChange={onChangeText}
            sx={{ marginBottom: 2 }}
          />
        )}
        <Button variant="contained" onClick={createEntry} fullWidth>
          Create
        </Button>
      </Box>
    </Dialog>
  );
};
