import { IAppWrite } from "./appwrite.interface";

export interface IReference extends IAppWrite {
  postId: string;
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
}
