import { Params } from "react-router-dom";
import { requestSeasons } from "../../requests/requestSeason";
import { requestBrand } from "../../requests/requestBrand";

export const brandLoader =
  () =>
  async ({ params }: { params: Params<string> }) => {
    const { data: brand } = await requestBrand(params.brandId);
    const { data: seasons } = await requestSeasons(params.brandId);

    return {
      seasons,
      brand,
    };
  };
