export interface IEraCreate {
  title: string;
  id: string;
  ownerId: string;
  description: string;
  coverImageUrl?: string;
}

export interface IEra {
  id: string;
  title: string;
  description: string;
  creationDate: Date;
  ownerId: string;
  startDate: Date;
  isPublic: boolean;
  coverImageUrl: string;
  allowSuggestions: boolean;
}
