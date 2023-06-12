import { Params } from "react-router-dom";
import {
  requestComments,
  requestEntey,
  useRequestEra,
  requestTopic,
} from "../../requests";

export const useEntryLoader = async ({ params }: { params: Params<string> }) => {
  const { data: topic } = requestTopic({ slug: params.topicSlug });
  const { data: era } = useRequestEra({ slug: params.eraSlug });
  const { data: entry } = requestEntey(params.entryId || "-1");
  const { data: comments } = requestComments(params.entryId || "-1");
  return {
    topic,
    era,
    entry,
    comments,
  };
};
