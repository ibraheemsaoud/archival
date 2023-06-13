import { EntryType } from "./entry.interface";

export interface IMediaEntry {
  id: string;
  title: string;
  description?: string;
  timestamp: Date;
  userId: string;
  eraId: string;
  variant: EntryType.Media;
  type: "image" | "video";
  link: string;
}
