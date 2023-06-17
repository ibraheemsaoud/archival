import { IEntry } from "./entry.interface";

export enum EntryType {
  Media = "media",
  CoverPost = "coverPost",
  Collection = "collection",
  QuickLinks = "quickLinks",
}

export interface IQuickLinks {
  id: string;
  type: EntryType.QuickLinks;
  links: ILink[];
  order: number;
}

export interface IMedia {
  id: string;
  type: EntryType.Media;
  title: string;
  description?: string;
  timestamp: Date;
  entryType: "image" | "video";
  link: string;
  order: number;
}

export interface ICoverPost {
  id: string;
  type: EntryType.CoverPost;
  title: string;
  description?: string;
  entryId: string;
  entry?: IEntry;
  order: number;
}

export interface ICollection {
  id: string;
  type: EntryType.Collection;
  title: string;
  entryIds: string[];
  entries?: IEntry[];
  order: number;
}

export type ITimelineEntry = IQuickLinks | IMedia | ICoverPost | ICollection;

interface ILink {
  title: string;
  link: string;
}
