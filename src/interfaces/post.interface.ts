import { IAppWrite } from "./appwrite.interface";
import { IComment } from "./comment.interface";
import { IReference } from "./reference.interface";
import { ISeason } from "./season.interface";
import { IStyling } from "./styling.interface";

export interface IPostCreate {
  season: string;
  seasonSlug: string;
  pictureLink: string;
  postTitle: string;
  userId: string;
  search?: string;
}

export interface IPost extends IAppWrite {
  season: ISeason;
  pictureLink: string;
  userId: string;
  postTitle: string;
  commentsCount: number;
  referencesCount: number;
  stylingsCount: number;
  stylings: IStyling[];
  secondaryStylings: IStyling[];
  references: IReference[];
  comments: IComment[];
}
