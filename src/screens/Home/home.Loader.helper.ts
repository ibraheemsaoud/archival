import { requestBrands } from "../../requests/requestBrands";

export const homeLoader = () => async () => {
  const { data: brands } = await requestBrands();

  return {
    brands,
  };
};
