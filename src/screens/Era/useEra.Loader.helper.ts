import { Params } from "react-router-dom";
import { useRequestEra } from "../../requests/useRequestEra";
import { requestEntries, requestTopic } from "../../requests";

export const useEraLoader = async ({ params }: { params: Params<string> }) => {
  const { data: topic } = requestTopic({ slug: params.topicSlug });
  const { data: era } = useRequestEra({ slug: params.eraSlug });
  const { data: entries } = requestEntries(era?.id);
  return {
    topic,
    era,
    entries,
  };
};
