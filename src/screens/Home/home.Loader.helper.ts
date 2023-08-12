import { requestBrands } from "../../requests/requestBrand";
import { requestFashionWeek } from "../../requests/requestFashionWeek";

export const homeLoader = () => async () => {
  const { data: brands } = await requestBrands();
  const { data: fashionWeek } = await requestFashionWeek("PFW-M-RTW-SS2024");

  return {
    brands,
    fashionWeek,
  };
};
