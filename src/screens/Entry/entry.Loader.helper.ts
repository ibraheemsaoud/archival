import { Params } from "react-router-dom";
import { requestEntry, requestEra, requestComments } from "../../requests";

export const entryLoader =
  () =>
  async ({ params }: { params: Params<string> }) => {
    const [era, entry, comments] = await Promise.all([
      requestEra(params.eraId),
      requestEntry(params.entryId),
      requestComments(params.entryId),
    ]);
    return {
      era: era.data,
      entry: entry.data,
      comments: comments.data,
    };
  };
