import { Params } from "react-router-dom";
import { requestEra } from "../../requests/requestEra";
import { requestEntries } from "../../requests";

export const eraLoader = async ({ params }: { params: Params<string> }) => {
  const { data: era } = requestEra(params.eraId || "-1");
  const { data: entries } = requestEntries(params.eraId || "-1");
  return {
    era,
    entries,
  };
};
