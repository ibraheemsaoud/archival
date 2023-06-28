import { IEntry } from "./entry.interface";

export enum EntryType {
  Media = "media",
  CoverPost = "coverPost",
  Collection = "collection",
  QuickLinks = "quickLinks",
}

export interface IQuickLinksCreate {
  order: number;
  type: EntryType.QuickLinks;
  links: ILink[];
}

export interface IQuickLinks {
  $id: string;
  order: number;
  links: string[];
}

export interface IMediaCreate {
  order: number;
  type: EntryType.Media;
  title: string;
  description?: string;
  timestamp: Date;
  entryType: "image" | "video";
  link: string;
}

export interface IMedia {
  $id: string;
  order: number;
  type: EntryType.Media;
  title: string;
  description?: string;
  timestamp: Date;
  link: string;
}

export interface ICoverPostCreate {
  order: number;
  type: EntryType.CoverPost;
  title: string;
  description?: string;
  entryId: string;
}

export interface ICoverPost {
  $id: string;
  order: number;
  type: EntryType.CoverPost;
  title: string;
  description?: string;
  entryId: string;
  entry?: IEntry;
}

export interface ICollectionCreate {
  order: number;
  type: EntryType.Collection;
  title: string;
  entryIds: string[];
}

export interface ICollection {
  $id: string;
  order: number;
  type: EntryType.Collection;
  title: string;
  entryIds: string[];
  entries?: IEntry[];
}

export interface ITimelineEntry {
  $id: string;
  EraId: string;
  order: number;
  type: EntryType;
  title?: string;
  description?: string;
  timestamp?: Date;
  link?: string;
  entryId?: string;
  entry?: IEntry;
  entryIds?: string[];
  entries?: IEntry[];
  links?: string[];
  linksData?: ILink[];
}
export type ITimelineEntryCreate =
  | IQuickLinksCreate
  | IMediaCreate
  | ICoverPostCreate
  | ICollectionCreate;

interface ILink {
  title: string;
  link: string;
}
