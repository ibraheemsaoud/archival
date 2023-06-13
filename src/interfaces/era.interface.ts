import { EntryType } from "./entry.interface";

export interface IEra {
  id: string;
  slug: string;
  title: string;
  description: string;
  creationDate: Date;
  ownerId: string;
  topicId: string;
  starDate: Date;
  endDate: Date;
  isPublic: boolean;
  coverImageUrl?: string;
  timelineEntries: { entryId: string; entryType: EntryType }[];
}
