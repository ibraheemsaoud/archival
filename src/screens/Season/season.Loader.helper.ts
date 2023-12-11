import { Params } from "react-router-dom";

export const seasonsLoader =
  () =>
  async ({ params }: { params: Params<string> }) => ({
    seasonId: params.seasonId,
  });
