import { IAppWrite } from "./appwrite.interface";

export interface IEraCreate {
  id: string;
  title: string;
  description: string;
  coverImageUrl?: string;
  accentColor?: string;
}

export interface IEra extends IAppWrite {
  id: string;
  title: string;
  topicId: string;
  description: string;
  isPublic: boolean; 
  coverImageUrl?: string;
  disableSuggestions: boolean;
  accentColor?: string;
}
