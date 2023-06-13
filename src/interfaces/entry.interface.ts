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
  eraId: string;
  link: string;
  text: string;
};

export interface IEntry {
  id: string;
  title: string;
  timestamp: Date;
  eraId: string;
  type: "Analysis" | "Coverage" | "Anticipation";
  interaction: IEntryInteraction;
  isEdited?: boolean;
  link: string;
  text: string;
}
