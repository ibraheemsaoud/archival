export interface IEntery {
  id: string;
  title: string;
  timestamp: Date;
  userId: string;
  eraId: string;
  type: "Analysis" | "Coverage" | "Anticipation";
  isEdited?: boolean;
}
