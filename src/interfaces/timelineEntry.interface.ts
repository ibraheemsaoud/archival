import { IAppWrite } from "./appwrite.interface";
import { IEntry } from "./entry.interface";

export enum EntryType {
  Media = "media",
  CoverPost = "coverPost",
  Collection = "collection",
  QuickLinks = "quickLinks",
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
  entryIds?: string[];
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
