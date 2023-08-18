import { IAppWrite } from "./appwrite.interface";

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
  seasonIds: string[];
  tags: FashionWeekTags[];
  isPublic: boolean;
}
