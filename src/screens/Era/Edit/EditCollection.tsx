import { useState } from "react";
import { ICollection } from "../../../interfaces/timelineEntry.interface";
import { Box, Button, TextField } from "@mui/material";

interface IEditCollection {
  entry: ICollection;
  onChange: (entry: ICollection) => void;
  onDelete: (entry: ICollection) => void;
}

export const EditCollection = ({
  entry,
  onChange,
  onDelete,
}: IEditCollection) => {
  const [title, setTitle] = useState(entry.title || "");
  const [listOfEntryIds, setListOfEntryIds] = useState(
    entry.entryIds.join(",") || ""
  );

  const onChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };
  const onChangeListOfEntryIds = (e: React.ChangeEvent<HTMLInputElement>) => {
    setListOfEntryIds(e.target.value);
  };

  const onHandleChange = () => {
    onChange({
      ...entry,
      title,
      entryIds: listOfEntryIds
        .split(",")
        .map((id) => id.trim())
        .filter((id) => id !== ""),
    });
  };

  const onHandleDelete = () => {
    onDelete(entry);
  };

  return (
    <Box
      sx={(theme) => ({
        margin: 1,
        paddingX: 1,
        paddingY: 2,
        border: `1px solid ${theme.palette.divider}`,
        borderRadius: 1,
      })}
    >
      Collection: shows multiple entries.
      <TextField
        id="standard-basic"
        label="Title"
        variant="standard"
        fullWidth
        value={title}
        onChange={onChangeTitle}
        sx={{ marginBottom: 2 }}
      />
      <TextField
        id="standard-basic"
        label="Entry IDs (comma separated)"
        variant="standard"
        fullWidth
        value={listOfEntryIds}
        onChange={onChangeListOfEntryIds}
        sx={{ marginBottom: 2 }}
      />
      <Button onClick={onHandleChange}>Update</Button>
      <Button onClick={onHandleDelete}>Delete</Button>
    </Box>
  );
};
