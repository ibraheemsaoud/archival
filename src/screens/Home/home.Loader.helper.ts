import { requestBrands } from "../../requests/requestBrand";
import { requestFashionWeeks } from "../../requests/requestFashionWeek";

export const homeLoader = () => async () => {
  const { data: brands } = await requestBrands();
  const { data: fashionWeeks } = await requestFashionWeeks();

  return {
    brands,
    fashionWeeks,
  };
};
