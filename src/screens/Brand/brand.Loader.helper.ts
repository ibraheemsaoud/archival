import { Params } from "react-router-dom";
import { requestBrand } from "../../requests/requestBrand";

export const brandLoader =
  () =>
  async ({ params }: { params: Params<string> }) => {
    const { data: brand } = await requestBrand(params.brandId);

    return {
      brand,
    };
  };
