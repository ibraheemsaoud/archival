import { IAppWrite } from "./appwrite.interface";

export interface ICommentCreate {
  postId: string;
  userId: string;
  comment: string;
}

export interface IComment extends IAppWrite {
  postId: string;
  userId: string;
  comment: string;
}
