import { IAppWrite } from "./appwrite.interface";
import { IBrand } from "./brand.interface";
import { FashionWeekTags } from "./fashionWeek.interface";
import { IPost } from "./post.interface";
import { IReference } from "./reference.interface";

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
