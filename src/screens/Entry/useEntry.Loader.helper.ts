import { Params } from "react-router-dom";
import {
  requestComments,
  useRequestEntry,
  useRequestEra,
  requestTopic,
} from "../../requests";

export const useEntryLoader = async ({ params }: { params: Params<string> }) => {
  const { data: topic } = requestTopic({ slug: params.topicSlug });
  const { data: era } = useRequestEra({ slug: params.eraSlug });
  const { data: entry } = useRequestEntry(params.entryId || "-1");
  const { data: comments } = requestComments(params.entryId || "-1");
  return {
    topic,
    era,
    entry,
    comments,
  };
};
