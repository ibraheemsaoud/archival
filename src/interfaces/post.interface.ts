import { IAppWrite } from "./appwrite.interface";
import { ISeason } from "./season.interface";

export interface IPostCreate {
  season: string;
  pictureLink: string;
  postTitle: string;
  userId: string;
}

export interface IPost extends IAppWrite {
  season: ISeason;
  pictureLink: string;
  userId: string;
  postTitle: string;
  commentsCount: number;
  referencesCount: number;
}
