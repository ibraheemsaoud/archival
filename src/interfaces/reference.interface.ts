import { IAppWrite } from "./appwrite.interface";

export interface IReference extends IAppWrite {
  postId: string;
  userId: string;
  referenceType:
    | "wikipedia"
    | "archivals_post"
    | "archivals_brand"
    | "archivals_season"
    | "instagram_account"
    | "instagram_post"
    | "youtube";
  referenceLink: string;
}
