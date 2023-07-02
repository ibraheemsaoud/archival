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
