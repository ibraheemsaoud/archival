import { IEntry } from "./entry.interface";

export enum EntryType {
  Media = "media",
  CoverPost = "coverPost",
  Collection = "collection",
  QuickLinks = "quickLinks",
}

export interface IQuickLinks {
  id?: string;
  order?: number;
  type: EntryType.QuickLinks;
  links: ILink[];
}

export interface IMedia {
  id?: string;
  order?: number;
  type: EntryType.Media;
  title: string;
  description?: string;
  timestamp: Date;
  entryType: "image" | "video";
  link: string;
}

export interface ICoverPost {
  id?: string;
  order?: number;
  type: EntryType.CoverPost;
  title: string;
  description?: string;
  entryId: string;
  entry?: IEntry;
}

export interface ICollection {
  id?: string;
  order?: number;
  type: EntryType.Collection;
  title: string;
  entryIds: string[];
  entries?: IEntry[];
}

export type ITimelineEntry = IQuickLinks | IMedia | ICoverPost | ICollection;

interface ILink {
  title: string;
  link: string;
}
