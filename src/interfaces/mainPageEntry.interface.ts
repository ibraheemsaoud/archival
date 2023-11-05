import { IFashionWeek } from "./fashionWeek.interface";
import { ISeason } from "./season.interface";

export type IMainPageEntry =
  | {
      type: "featured_fashion_week";
      entry: IFashionWeek;
    }
  | {
      type: "current_fashion_week";
      entry: IFashionWeek;
    }
  | {
      type: "featured_season";
      entry: ISeason;
    }
  | {
      type: "current_seasons";
      entry: ISeason[];
    };
// | {
//     type: "featured_curator";
//     entry: ICurator;
//   };
