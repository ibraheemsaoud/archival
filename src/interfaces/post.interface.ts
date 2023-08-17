import { IAppWrite } from "./appwrite.interface";

export interface IPostCreate {
  seasonId: string;
  pictureLink: string;
  postTitle: string;
  userId: string;
}

export interface IPost extends IAppWrite {
  seasonId: string;
  pictureLink: string;
  userId: string;
  postTitle: string;
}
