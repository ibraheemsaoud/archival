import { IAppWrite } from "./appwrite.interface";
import { IPost } from "./post.interface";

export interface ICommentCreate {
  post: string;
  userId: string;
  comment: string;
}

export interface IComment extends IAppWrite {
  post: IPost;
  userId: string;
  comment: string;
}
