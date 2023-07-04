import { Box } from "@mui/material";
import {
  EntryType,
  ITimelineEntry,
} from "../../../../interfaces/timelineEntry.interface";
import { EditMedia } from "../TimelineEntry/EditMedia";
import { EditCoverPost } from "../TimelineEntry/EditCoverPost";
import { EditCollection } from "../TimelineEntry/EditCollection";
import { EditQuickLinks } from "../TimelineEntry/EditQuickLinks";
import { useTimelineEditor } from "../useTimelineEditor";
import { TimelineEntryCreator } from "./TimeLineEntryCreator";

export const TimelineEditor = ({ eraId }: { eraId: string }) => {
  const { entries, createNewEntry, updateEntry, deleteEntry } =
    useTimelineEditor(eraId);

  const onChange = (entry: ITimelineEntry) => {
    updateEntry(entry);
  };

  const onDelete = (entry: ITimelineEntry) => {
    deleteEntry(entry);
  };

  const onMoveDown = (entry: ITimelineEntry) => {
    const index = entries.findIndex((e) => e.$id === entry.$id);
    if (index === -1) {
      return;
    }
    if (index === entries.length - 1) {
      return;
    }
    // swap the order property of the two entries
    const newEntries = [...entries];
    const temp = newEntries[index].order;
    newEntries[index].order = newEntries[index + 1].order;
    newEntries[index + 1].order = temp;
    // update the database
    onChange(newEntries[index]);
    // send this request in 50ms
    setTimeout(() => {
      onChange(newEntries[index + 1]);
    }, 50);
  };

  const onMoveUp = (entry: ITimelineEntry) => {
    const index = entries.findIndex((e) => e.$id === entry.$id);
    if (index === -1) {
      return;
    }
    if (index === 0) {
      return;
    }
    // swap the order property of the two entries
    const newEntries = [...entries];
    const temp = newEntries[index].order;
    newEntries[index].order = newEntries[index - 1].order;
    newEntries[index - 1].order = temp;
    // update the database
    onChange(newEntries[index]);
    // send this request in 50ms
    setTimeout(() => {
      onChange(newEntries[index - 1]);
    }, 50);
  };

  return (
    <Box>
      <TimelineEntryCreator
        entries={entries}
        createNewEntry={createNewEntry}
        eraId={eraId}
      />
      {entries.map((entry, index) => {
        if (entry.type === EntryType.Media) {
          return (
            <EditMedia
              key={index}
              entry={entry}
              onChange={onChange}
              onDelete={onDelete}
              onMoveDown={onMoveDown}
              onMoveUp={onMoveUp}
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
              onMoveDown={onMoveDown}
              onMoveUp={onMoveUp}
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
              onMoveDown={onMoveDown}
              onMoveUp={onMoveUp}
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
              onMoveDown={onMoveDown}
              onMoveUp={onMoveUp}
            />
          );
        }
        return null;
      })}
    </Box>
  );
};
