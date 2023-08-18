import { IAppWrite } from "./appwrite.interface";

export interface IBrand extends IAppWrite {
  slug: string;
  name: string;
  primaryColor?: string;
  secondaryColor?: string;
  logoLink: string;
  isPublic?: boolean;
}
