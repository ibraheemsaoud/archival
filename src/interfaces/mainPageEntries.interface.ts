import { IFashionWeek } from "./fashionWeek.interface";

export type IMainPageEntries = IFashionWeekEntry[];

type IFashionWeekEntry = {
  type: "featured_fashion_week";
  entry: IFashionWeek[];
};
