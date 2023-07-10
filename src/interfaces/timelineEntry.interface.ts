import { IAppWrite } from "./appwrite.interface";
import { IEntry } from "./entry.interface";

export enum EntryType {
  Media = "media",
  CoverPost = "coverPost",
  Collection = "collection",
  QuickLinks = "quickLinks",
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

export interface ITimelineEntry extends IAppWrite {
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
}

export type ITimelineEntryCreate = {
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
};

export interface ILink extends IAppWrite {
  title: string;
  link: string;
  eraId: string;
}

export interface ILinkCreate {
  title: string;
  link: string;
  eraId: string;
}
