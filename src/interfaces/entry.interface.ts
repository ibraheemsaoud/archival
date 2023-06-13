export enum EntryType {
  Media = "media",
  CoverPost = "coverPost",
  Collection = "collection",
  QuickLinks = "quickLinks",
}

export type IEntryInteraction = {
  shares?: number;
  likes?: number;
  comments?: number;
  clicks?: number;
  reactions?: number;
  height: number;
};

export type IEntryCreate = {
  title: string;
  timestamp: Date;
  userId: string;
  eraId: string;
  link: string;
  text: string;
};

export type IEntry =
  | {
      id: string;
      title: string;
      timestamp: Date;
      userId: string;
      eraId: string;
      type: "Analysis" | "Coverage" | "Anticipation";
      interaction: IEntryInteraction;
      variant: "normal";
      isEdited?: boolean;
      link: string;
      text: string;
    }
  | {
      id: string;
      variant: "empty";
      interaction: IEntryInteraction;
      title?: undefined;
      timestamp?: undefined;
      userId?: undefined;
      eraId?: undefined;
      type?: undefined;
      isEdited?: undefined;
      link?: undefined;
      text?: undefined;
    };
