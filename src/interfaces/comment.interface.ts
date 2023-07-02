import { IAppWrite } from "./appwrite.interface";

export interface IComment extends IAppWrite {
  userId: string;
  entryId: string;
  message: string;
}

export interface ICommentCreate {
  userId: string;
  entryId: string;
  message: string;
}
