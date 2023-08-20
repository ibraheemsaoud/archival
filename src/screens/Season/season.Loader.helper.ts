import { Params } from "react-router-dom";
import { requestSeason } from "../../requests/requestSeason";
import { requestBrand } from "../../requests/requestBrand";

export const seasonsLoader =
  () =>
  async ({ params }: { params: Params<string> }) => {
    const { data: season } = await requestSeason(params.seasonId);
    const { data: brand } = await requestBrand(season?.brandId);

    return {
      season,
      brand,
    };
  };
