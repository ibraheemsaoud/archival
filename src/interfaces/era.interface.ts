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
  creationDate: Date; // deprecated
  ownerId: string; // deprecated?
  startDate: Date; // deprecated?
  isPublic: boolean; 
  coverImageUrl: string;
  disableSuggestions: boolean;
}
