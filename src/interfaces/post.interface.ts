import { IAppWrite } from "./appwrite.interface";

export interface IPost extends IAppWrite {
  seasonId: string;
  pictureLink: string;
  userId: string;
  postTitle: string;
}
