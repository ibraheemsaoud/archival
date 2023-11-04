import { IAppWrite } from "./appwrite.interface";
import { ISeason } from "./season.interface";

export enum FashionWeekTags {
  "Menswear" = "Menswear",
  "Womenswear" = "Womenswear",
  "Couture" = "Couture",
  "ReadyToWear" = "ReadyToWear",
  "SS" = "SS",
  "AW" = "AW",
}

export interface IFashionWeek extends IAppWrite {
  slug: string;
  name: string;
  seasons: ISeason[];
  tags: FashionWeekTags[];
  isPublic: boolean;
}
