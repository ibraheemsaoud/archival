import { useState } from "react";
import { ITimelineEntry } from "../../../interfaces/timelineEntry.interface";
import {
  Box,
  Button,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { EntryType } from "../../../interfaces/timelineEntry.interface";
import { EditMedia } from "./EditMedia";
import { EditCoverPost } from "./EditCoverPost";
import { EditCollection } from "./EditCollection";
import { EditQuickLinks } from "./EditQuickLinks";

export const TimelineEditor = ({
  timeline,
  onClose,
}: {
  timeline: ITimelineEntry[];
  onClose: () => void;
}) => {
  // allow editing the timeline depending on the element type
  const [entries, setEntries] = useState(timeline);
  const [type, setType] = useState<EntryType>(EntryType.Media);
  const onChange = (index: number) => (entry: any) => {
    const newEntries = [...entries];
    newEntries[index] = entry;
    setEntries(newEntries);
  };
  const onDelete = (index: number) => () => {
    const newEntries = [...entries];
    newEntries.splice(index, 1);
    setEntries(newEntries);
  };
  const handleChangeType = (e: SelectChangeEvent<EntryType>) => {
    setType(e.target.value as EntryType);
  };
  const onClick = () => {
    if (type === EntryType.Media) {
      setEntries([
        ...entries,
        {
          type,
          title: "",
          description: "",
          entryType: "image",
          link: "",
          timestamp: new Date(),
        },
      ]);
    }
    if (type === EntryType.CoverPost) {
      setEntries([
        ...entries,
        {
          type,
          title: "",
          description: "",
          entryId: "",
        },
      ]);
    }
    if (type === EntryType.Collection) {
      setEntries([
        ...entries,
        {
          type,
          title: "",
          entryIds: [],
        },
      ]);
    }
    if (type === EntryType.QuickLinks) {
      setEntries([
        ...entries,
        {
          type,
          links: [],
        },
      ]);
    }
  };
  return (
    <Box>
      {entries.map((entry, index) => {
        if (entry.type === EntryType.Media) {
          return (
            <EditMedia
              key={index}
              entry={entry}
              onChange={onChange(index)}
              onDelete={onDelete(index)}
            />
          );
        }
        if (entry.type === EntryType.CoverPost) {
          return (
            <EditCoverPost
              key={index}
              entry={entry}
              onChange={onChange(index)}
              onDelete={onDelete(index)}
            />
          );
        }
        if (entry.type === EntryType.Collection) {
          return (
            <EditCollection
              key={index}
              entry={entry}
              onChange={onChange(index)}
              onDelete={onDelete(index)}
            />
          );
        }
        if (entry.type === EntryType.QuickLinks) {
          return (
            <EditQuickLinks
              key={index}
              entry={entry}
              onChange={onChange(index)}
              onDelete={onDelete(index)}
            />
          );
        }
        return null;
      })}
      <Select label="Create New Entry" onChange={handleChangeType} value={type}>
        <MenuItem value={EntryType.Collection}>Collection</MenuItem>
        <MenuItem value={EntryType.CoverPost}>Cover Post</MenuItem>
        <MenuItem value={EntryType.Media}>Media</MenuItem>
        <MenuItem value={EntryType.QuickLinks}>Quick Links</MenuItem>
      </Select>
      <Button onClick={onClick}>Create</Button>
      <Button onClick={onClose}>Close</Button>
      <Button onClick={onClose}>Save</Button>
    </Box>
  );
};
