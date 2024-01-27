import { Params } from "react-router-dom";

export const fashionWeekLoader =
  () =>
  async ({ params }: { params: Params<string> }) => ({
    fashionWeekId: params.fashionWeekId,
  });
