import {
  Box,
  Button,
  MenuItem,
  Select,
  SelectChangeEvent,
  Typography,
} from "@mui/material";
import {
  EntryType,
  ITimelineEntry,
  ITimelineEntryCreate,
} from "../../../../interfaces/timelineEntry.interface";
import { useState } from "react";

export const TimelineEntryCreator = ({
  entries,
  createNewEntry,
  eraId,
}: {
  entries: ITimelineEntry[];
  createNewEntry: (entry: ITimelineEntryCreate) => void;
  eraId: string;
}) => {
  const [type, setType] = useState<EntryType>(EntryType.Media);

  const handleChangeType = (e: SelectChangeEvent<EntryType>) => {
    setType(e.target.value as EntryType);
  };

  const onCreate = () => {
    const order = entries.length > 0 ? entries[0].order + 1 : 1;
    if (type === EntryType.Media) {
      createNewEntry({
        EraId: eraId,
        order,
        type,
        title: "",
        description: "",
        timestamp: new Date(),
      });
    }
    if (type === EntryType.CoverPost) {
      createNewEntry({
        EraId: eraId,
        order,
        type,
        title: "",
        description: "",
        entryId: "",
      });
    }
    if (type === EntryType.Collection) {
      createNewEntry({
        EraId: eraId,
        order,
        type,
        title: "",
        entryIds: [],
      });
    }
    if (type === EntryType.QuickLinks) {
      createNewEntry({
        EraId: eraId,
        order,
        type,
        links: [],
      });
    }
  };

  return (
    <Box
      sx={(theme) => ({
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        margin: theme.spacing(1),
        padding: theme.spacing(2),
        border: `1px solid ${theme.palette.divider}`,
        borderRadius: "4px",
      })}
    >
      <Typography variant="h5">Create New Entry</Typography>
      <Select onChange={handleChangeType} value={type}>
        <MenuItem value={EntryType.Collection}>Collection</MenuItem>
        <MenuItem value={EntryType.CoverPost}>Cover Post</MenuItem>
        <MenuItem value={EntryType.Media}>Media</MenuItem>
        <MenuItem value={EntryType.QuickLinks}>Quick Links</MenuItem>
      </Select>
      <Button onClick={onCreate} variant="contained">
        Create
      </Button>
    </Box>
  );
};
