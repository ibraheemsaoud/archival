import { IAppWrite } from "./appwrite.interface";
import { IPost } from "./post.interface";

export interface IReferenceCreate {
  post: string;
  userId: string;
  reference_type:
    | "wikipedia"
    | "archivals_post"
    | "archivals_brand"
    | "archivals_season"
    | "instagram_account"
    | "instagram_post"
    | "youtube";
  reference_link: string;
  imageLink: string;
  referenceTitle: string;
  referenceDescription: string;
}

export interface IReference extends IAppWrite {
  post: IPost;
  userId: string;
  reference_type:
    | "wikipedia"
    | "archivals_post"
    | "archivals_brand"
    | "archivals_season"
    | "instagram_account"
    | "instagram_post"
    | "youtube";
  reference_link: string;
  imageLink: string;
  referenceTitle: string;
  referenceDescription: string;
}
