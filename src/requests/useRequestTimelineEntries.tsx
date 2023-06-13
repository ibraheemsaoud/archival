import { IEntry } from "../interfaces/entry.interface";
import {
  EntryType,
  ITimelineEntry,
} from "../interfaces/timelineEntry.interface";
import { entryList } from "./useRequestEntries";

export const useRequestTimelineEntries = (
  timelineEntries: ITimelineEntry[]
) => {
  const updatedEntries = timelineEntries.map((entry) => {
    if (entry.type === EntryType.CoverPost) {
      return {
        ...entry,
        entry: entryList.find((e) => e.id === entry.entryId),
      };
    }
    if (entry.type === EntryType.Collection) {
      const entries: IEntry[] = [];
      entry.listOfEntryIds.forEach((id) => {
        const entry = entryList.find((e) => e.id === id);
        if (entry) {
          entries.push(entry);
        }
      });
      return {
        ...entry,
        entries,
      };
    }
    return entry;
  });

  return {
    isLoading: false,
    error: null,
    data: updatedEntries,
  };
};
