import { IAppWrite } from "./appwrite.interface";
import { ISeason } from "./season.interface";

export enum FashionWeekTags {
  "Menswear" = "Menswear",
  "Womenswear" = "Womenswear",
  "Couture" = "Couture",
  "ReadyToWear" = "Ready-to-wear",
  "SS" = "Spring/Summer",
  "AW" = "Fall/Winter",
}

export interface IFashionWeek extends IAppWrite {
  slug: string;
  name: string;
  seasons: ISeason[];
  tags: FashionWeekTags[];
  isPublic: boolean;
}
