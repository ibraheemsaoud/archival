import { IAppWrite } from "./appwrite.interface";

export interface IComment extends IAppWrite {
  postId: string;
  userId: string;
  comment: string;
}
