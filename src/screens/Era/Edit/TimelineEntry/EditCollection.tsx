import { useState } from "react";
import { ITimelineEntry } from "../../../../interfaces/timelineEntry.interface";
import { Autocomplete, Box, Button, TextField } from "@mui/material";
import { IEntry } from "../../../../interfaces/entry.interface";
import { useLoaderData } from "react-router-dom";

interface IEditCollection {
  entry: ITimelineEntry;
  onChange: (entry: ITimelineEntry) => void;
  onDelete: (entry: ITimelineEntry) => void;
  onMoveDown: (entry: ITimelineEntry) => void;
  onMoveUp: (entry: ITimelineEntry) => void;
}

export const EditCollection = ({
  entry,
  onChange,
  onDelete,
  onMoveDown,
  onMoveUp,
}: IEditCollection) => {
  const { entries } = useLoaderData() as any as {
    entries: IEntry[];
  };

  const [title, setTitle] = useState(entry.title || "");
  const [listOfEntryIds, setListOfEntryIds] = useState(entry.entryIds || []);

  const onChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };
  const onChangeListOfEntryIds = (e: any, value: string[]) => {
    setListOfEntryIds(value);
  };

  const onHandleChange = () => {
    onChange({
      ...entry,
      title,
      entryIds: listOfEntryIds,
    });
  };

  const onHandleDelete = () => {
    onDelete(entry);
  };

  const onHandleMoveUp = () => {
    onMoveUp(entry);
  };

  const onHandleMoveDown = () => {
    onMoveDown(entry);
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
      <Autocomplete
        disablePortal
        id="entryIds"
        options={entries.map((entry: IEntry) => entry.$id)}
        sx={{ marginBottom: 2 }}
        onChange={onChangeListOfEntryIds}
        defaultValue={listOfEntryIds}
        multiple
        renderInput={(params) => (
          <TextField {...params} label="Entry IDs (comma separated)" />
        )}
      />
      <Button onClick={onHandleChange}>Update</Button>
      <Button onClick={onHandleDelete}>Delete</Button>
      <Button onClick={onHandleMoveUp}>Move Up</Button>
      <Button onClick={onHandleMoveDown}>Move Down</Button>
    </Box>
  );
};
