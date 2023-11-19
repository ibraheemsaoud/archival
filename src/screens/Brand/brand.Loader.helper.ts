import { Params } from "react-router-dom";

export const brandLoader =
  () =>
  async ({ params }: { params: Params<string> }) => ({
    brandId: params.brandId,
  });
