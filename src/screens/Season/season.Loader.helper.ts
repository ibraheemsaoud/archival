import { Params } from "react-router-dom";
import { requestSeason } from "../../requests/requestSeason";
import { requestBrand } from "../../requests/requestBrand";
import { requestPosts } from "../../requests/requestPost";

export const SeasonsLoader =
  () =>
  async ({ params }: { params: Params<string> }) => {
    const { data: season } = await requestSeason(params.seasonId);
    const { data: posts } = await requestPosts(season?.slug || "");
    console.log(season);
    const { data: brand } = await requestBrand(season?.brandId);
    console.log(brand);
    return {
      season,
      posts,
      brand,
    };
  };
