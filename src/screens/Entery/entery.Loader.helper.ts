import { Params } from "react-router-dom";
import { requestComments, requestEntey } from "../../requests";

export const entryLoader = async ({ params }: { params: Params<string> }) => {
  const { data: entry } = requestEntey(params.entryId || "-1");
  const { data: comments } = requestComments(params.entryId || "-1");
  return {
    entry,
    comments,
  };
};
