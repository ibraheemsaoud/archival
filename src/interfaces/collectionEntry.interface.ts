import { EntryType } from "./entry.interface";

export interface ICollectionEntry {
  id: string;
  title: string;
  timestamp: Date;
  userId: string;
  eraId: string;
  variant: EntryType.Collection;
  listOfEntryIds: string[];
}
