import { EntryType } from "./entry.interface";

export interface ICoverPostEntry {
  id: string;
  title: string;
  timestamp: Date;
  userId: string;
  eraId: string;
  variant: EntryType.CoverPost;
  entryId: string;
}
