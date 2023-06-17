export interface IEra {
  id: string;
  title: string;
  description: string;
  creationDate: Date;
  ownerId: string;
  startDate: Date;
  endDate?: Date;
  isPublic: boolean;
  coverImageUrl?: string;
  allowSuggestions: boolean;
}
