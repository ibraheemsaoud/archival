import { Params } from "react-router-dom";

export const stylingLoader =
  () =>
  async ({ params }: { params: Params<string> }) => ({
    stylingId: params.stylingId,
  });
