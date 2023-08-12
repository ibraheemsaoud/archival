import { IAppWrite } from "./appwrite.interface";
import { FashionWeekTags } from "./fashionWeek.interface";

export interface ISeason extends IAppWrite {
  slug: string;
  name: string;
  brandId: string;
  coverImage: string;
  primaryColor?: string;
  secondaryColor?: string;
  tags: FashionWeekTags[];
}
