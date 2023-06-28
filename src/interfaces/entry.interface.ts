export type IEntryInteraction = {
  shares?: number;
  likes?: number;
  comments?: number;
  clicks?: number;
  reactions?: number;
};

export type IEntryCreate = {
  title: string;
  timestamp: Date;
  link: string;
  text: string;
};

export interface IEntry {
  $id: string;
  eraId: string;
  title: string;
  timestamp: Date;
  link?: string;
  text?: string;
}
