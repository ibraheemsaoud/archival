export type IEntryInteraction = {
  shares?: number;
  likes?: number;
  comments?: number;
  clicks?: number;
  reactions?: number;
  height: number;
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
      isEdited?: boolean;
      variant: "link";
      link: string;
      text?: undefined;
      imageUrl?: undefined;
    }
  | {
      id: string;
      title: string;
      timestamp: Date;
      userId: string;
      eraId: string;
      type: "Analysis" | "Coverage" | "Anticipation";
      interaction: IEntryInteraction;
      isEdited?: boolean;
      variant: "text";
      link?: undefined;
      text: string;
      imageUrl?: undefined;
    }
  | {
      id: string;
      title: string;
      timestamp: Date;
      userId: string;
      eraId: string;
      type: "Analysis" | "Coverage" | "Anticipation";
      interaction: IEntryInteraction;
      isEdited?: boolean;
      variant: "image";
      link?: undefined;
      text?: undefined;
      imageUrl: string;
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
      imageUrl?: undefined;
    };
