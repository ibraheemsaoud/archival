import { useState } from "react";
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
} from "../../../interfaces/timelineEntry.interface";
import { EditMedia } from "./TimelineEntry/EditMedia";
import { EditCoverPost } from "./TimelineEntry/EditCoverPost";
import { EditCollection } from "./TimelineEntry/EditCollection";
import { EditQuickLinks } from "./TimelineEntry/EditQuickLinks";
import { useTimelineEditor } from "./useTimelineEditor";

export const TimelineEditor = ({
  eraId,
  topicId,
}: {
  eraId?: string;
  topicId?: string;
}) => {
  const { entries, createNewEntry, updateEntry, deleteEntry } =
    useTimelineEditor(topicId, eraId);
  // allow editing the timeline depending on the element type
  const [type, setType] = useState<EntryType>(EntryType.Media);
  const onChange = (entry: ITimelineEntry) => {
    updateEntry(entry);
  };
  const onDelete = (entry: ITimelineEntry) => {
    deleteEntry(entry);
  };
  const handleChangeType = (e: SelectChangeEvent<EntryType>) => {
    setType(e.target.value as EntryType);
  };
  const onCreate = () => {
    const order = entries.length > 0 ? entries[0].order / 2 : 1;
    if (type === EntryType.Media) {
      createNewEntry({
        order,
        type,
        title: "",
        description: "",
        entryType: "image",
        link: "",
        timestamp: new Date(),
      });
    }
    if (type === EntryType.CoverPost) {
      createNewEntry({
        order,
        type,
        title: "",
        description: "",
        entryId: "",
      });
    }
    if (type === EntryType.Collection) {
      createNewEntry({
        order,
        type,
        title: "",
        entryIds: [],
      });
    }
    if (type === EntryType.QuickLinks) {
      createNewEntry({
        order,
        type,
        links: [],
      });
    }
  };
  return (
    <Box>
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
      {entries.map((entry, index) => {
        if (entry.type === EntryType.Media) {
          return (
            <EditMedia
              key={index}
              entry={entry}
              onChange={onChange}
              onDelete={onDelete}
            />
          );
        }
        if (entry.type === EntryType.CoverPost) {
          return (
            <EditCoverPost
              key={index}
              entry={entry}
              onChange={onChange}
              onDelete={onDelete}
            />
          );
        }
        if (entry.type === EntryType.Collection) {
          return (
            <EditCollection
              key={index}
              entry={entry}
              onChange={onChange}
              onDelete={onDelete}
            />
          );
        }
        if (entry.type === EntryType.QuickLinks) {
          return (
            <EditQuickLinks
              key={index}
              entry={entry}
              onChange={onChange}
              onDelete={onDelete}
            />
          );
        }
        return null;
      })}
    </Box>
  );
};
