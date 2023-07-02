import { Params } from "react-router-dom";
import { requestEntry, requestEra } from "../../requests";

export const entryLoader =
  () =>
  async ({ params }: { params: Params<string> }) => {
    const [era, entry] = await Promise.all([
      requestEra(params.eraId),
      requestEntry(params.entryId),
    ]);
    return {
      era: era.data,
      entry: entry.data,
    };
  };
