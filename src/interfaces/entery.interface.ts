export type IEntery =
  | {
      id: string;
      title: string;
      timestamp: Date;
      userId: string;
      eraId: string;
      type: "Analysis" | "Coverage" | "Anticipation";
      isEdited?: boolean;
      variant: "link";
      link: string;
      text?: undefined;
      pictureUrl?: undefined;
    }
  | {
      id: string;
      title: string;
      timestamp: Date;
      userId: string;
      eraId: string;
      type: "Analysis" | "Coverage" | "Anticipation";
      isEdited?: boolean;
      variant: "text";
      link?: undefined;
      text: string;
      pictureUrl?: undefined;
    }
  | {
      id: string;
      title: string;
      timestamp: Date;
      userId: string;
      eraId: string;
      type: "Analysis" | "Coverage" | "Anticipation";
      isEdited?: boolean;
      variant: "picture";
      link?: undefined;
      text?: undefined;
      pictureUrl: string;
    };
