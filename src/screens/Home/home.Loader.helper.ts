import { requestBrands } from "../../requests/requestBrand";

export const homeLoader = () => async () => {
  const { data: brands } = await requestBrands();

  return { brands };
};
