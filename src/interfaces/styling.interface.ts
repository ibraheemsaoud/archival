import { IAppWrite } from "./appwrite.interface";
import { IPost } from "./post.interface";

export interface IStylingCreate {
  post?: string;
  userId: string;
  imageUrl: string;
  description: string;
}

export interface IStyling extends IAppWrite {
  mainPost: IPost;
  posts: IPost[];
  userId: string;
  imageUrl: string;
  description: string;
}
