import { IAppWrite } from "./appwrite.interface";
import { ISeason } from "./season.interface";

export interface IBrand extends IAppWrite {
  slug: string;
  name: string;
  primaryColor?: string;
  secondaryColor?: string;
  logoLink: string;
  isPublic?: boolean;
  seasons: ISeason[];
}
