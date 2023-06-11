import { Params } from "react-router-dom";
import { requestEra } from "../../requests/requestEra";
import { requestEntries, requestTopic } from "../../requests";

export const eraLoader = async ({ params }: { params: Params<string> }) => {
  const { data: topic } = requestTopic({ slug: params.topicSlug });
  const { data: era } = requestEra({ slug: params.eraSlug });
  const { data: entries } = requestEntries(era?.id);
  return {
    topic,
    era,
    entries,
  };
};
