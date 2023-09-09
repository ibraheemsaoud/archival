import { Params } from "react-router-dom";
import { requestSeason } from "../../requests/requestSeason";

export const seasonsLoader =
  () =>
  async ({ params }: { params: Params<string> }) => {
    const { data: season } = await requestSeason(params.seasonId);

    return {
      season,
    };
  };
