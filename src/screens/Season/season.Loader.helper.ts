import { Params } from "react-router-dom";
import { requestFashionWeek } from "../../requests/requestFashionWeek";
import { requestSeason } from "../../requests/requestSeason";
import { requestBrand } from "../../requests/requestBrand";

export const SeasonsLoader =
  () =>
  async ({ params }: { params: Params<string> }) => {
    const { data: season } = await requestSeason(params.seasonId);
    const { data: posts } = await requestFashionWeek("PFW-M-RTW-SS2024");
    console.log(season);
    const { data: brand } = await requestBrand(season?.brandId);
    console.log(brand);
    return {
      season,
      posts,
      brand,
    };
  };
