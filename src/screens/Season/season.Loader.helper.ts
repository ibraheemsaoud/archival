import { Params } from "react-router-dom";
import { requestSeason } from "../../requests/requestSeason";
import { requestBrand } from "../../requests/requestBrand";
import { requestPosts } from "../../requests/requestPost";

export const seasonsLoader =
  () =>
  async ({ params }: { params: Params<string> }) => {
    const { data: season } = await requestSeason(params.seasonId);
    const { data: posts } = await requestPosts(season?.slug || "");
    const { data: brand } = await requestBrand(season?.brandId);

    return {
      season,
      posts,
      brand,
    };
  };