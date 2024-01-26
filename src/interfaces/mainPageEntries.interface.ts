import { IFashionWeek } from "./fashionWeek.interface";
import { ISeason } from "./season.interface";

export type IMainPageEntries = (
  | IFeaturedFashionWeekEntry
  | ICurrentFashionWeekEntry
  | IFeaturedSeasonsEntry
  | ICurrentSeasonEntry
)[];

type IFeaturedFashionWeekEntry = {
  type: "featured_fashion_week";
  entry: IFashionWeek;
};

type ICurrentFashionWeekEntry = {
  type: "current_fashion_week";
  entry: IFashionWeek;
};

type IFeaturedSeasonsEntry = {
  type: "featured_seasons";
  entry: ISeason[];
};

type ICurrentSeasonEntry = {
  type: "current_season";
  entry: ISeason;
};
