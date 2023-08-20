import { IAppWrite } from "./appwrite.interface";

export interface IFollowCreate {
  userId: string;
  targetId: string;
  targetType: "brand";
}

export interface IFollow extends IAppWrite {
  userId: string;
  targetId: string;
  targetType: "brand";
}
