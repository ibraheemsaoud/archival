import { IAppWrite } from "./appwrite.interface";
import { IComment } from "./comment.interface";
import { IReference } from "./reference.interface";
import { ISeason } from "./season.interface";
import { IStyling } from "./styling.interface";

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
  stylings: IStyling[];
  references: IReference[];
  comments: IComment[];
}
