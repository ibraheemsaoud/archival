import { useEffect, useState } from "react";
import { ITimelineEntry } from "../../../../interfaces/timelineEntry.interface";
import { Autocomplete, Box, Button, TextField } from "@mui/material";
import { IEntry } from "../../../../interfaces/entry.interface";
import { useLoaderData } from "react-router-dom";
import { H3TextField, H5TextField } from "../../../../components";
import { Collection } from "../../../../components/Timeline/components";

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
  const [order, setOrder] = useState(entry.order || 0);

  useEffect(() => {
    setTitle(entry.title || "");
    setListOfEntryIds(entry.entryIds || []);
    setOrder(entry.order || 0);
  }, [entry]);

  const onChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };
  const onChangeListOfEntryIds = (e: any, value: string[]) => {
    setListOfEntryIds(value);
  };
  const onChangeOrder = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOrder(parseInt(e.target.value));
  };

  const onHandleChange = () => {
    onChange({
      ...entry,
      title,
      entryIds: listOfEntryIds,
      order,
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
    <Box sx={{ marginY: 2 }}>
      <H3TextField
        id="title"
        placeholder="Title"
        variant="standard"
        fullWidth
        value={title}
        onChange={onChangeTitle}
      />
      <Autocomplete
        disablePortal
        id="entryIds"
        options={entries.map((entry: IEntry) => entry.$id)}
        sx={{ marginBottom: 2 }}
        onChange={onChangeListOfEntryIds}
        defaultValue={listOfEntryIds}
        multiple
        selectOnFocus
        clearOnBlur
        handleHomeEndKeys
        renderOption={(props, option, state) =>
          [props, option, state.index] as React.ReactNode
        }
        renderInput={(params) => (
          <TextField {...params} placeholder="Entry IDs (comma separated)" />
        )}
      />
      <Collection
        entry={{
          ...entry,
          entryIds: listOfEntryIds,
          title,
        }}
        minimalDisplay
      />
      <H5TextField
        id="order"
        placeholder="Order"
        variant="standard"
        type="number"
        fullWidth
        value={order}
        onChange={onChangeOrder}
        sx={{ marginBottom: 2 }}
      />
      <Button onClick={onHandleChange}>Update</Button>
      <Button onClick={onHandleDelete}>Delete</Button>
      <Button onClick={onHandleMoveUp}>Move Up</Button>
      <Button onClick={onHandleMoveDown}>Move Down</Button>
    </Box>
  );
};
