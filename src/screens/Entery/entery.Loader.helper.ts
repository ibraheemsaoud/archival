import { Params } from "react-router-dom";
import {
  requestComments,
  requestEntey,
  requestEra,
  requestTopic,
} from "../../requests";

export const entryLoader = async ({ params }: { params: Params<string> }) => {
  const { data: topic } = requestTopic({ slug: params.topicSlug });
  const { data: era } = requestEra({ slug: params.eraSlug });
  const { data: entry } = requestEntey(params.entryId || "-1");
  const { data: comments } = requestComments(params.entryId || "-1");
  return {
    topic,
    era,
    entry,
    comments,
  };
};
