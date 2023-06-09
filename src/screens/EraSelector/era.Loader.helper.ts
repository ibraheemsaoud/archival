import { Params } from "react-router-dom";
import { requestEra } from "../../requests/requestEra";

export const eraLoader = async ({ params }: { params: Params<string> }) => {
  const { data: era } = requestEra(params.eraId || "-1");
  return {
    era,
  };
};
