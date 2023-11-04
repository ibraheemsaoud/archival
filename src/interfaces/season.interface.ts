import { IAppWrite } from "./appwrite.interface";
import { IBrand } from "./brand.interface";
import { FashionWeekTags } from "./fashionWeek.interface";
import { IPost } from "./post.interface";
import { IReference } from "./reference.interface";

export interface ISeasonCreate {
  slug: string;
  name: string;
  coverImage: string;
  primaryColor: string;
  secondaryColor: string;
  tags?: FashionWeekTags[];
  isPublic?: boolean;
  brand: string;
  fashionWeek: string;
}

export interface ISeasonCreateErrors {
  slug?: string;
  name?: string;
  coverImage?: string;
  primaryColor?: string;
  secondaryColor?: string;
  tags?: string;
  isPublic?: string;
  brand?: string;
  fashionWeek?: string;
}

export interface ISeason extends IAppWrite {
  slug: string;
  name: string;
  brand: IBrand;
  coverImage: string;
  primaryColor?: string;
  secondaryColor?: string;
  tags: FashionWeekTags[];
  isPublic: boolean;
  posts: IPost[];
  references: IReference[];
}
