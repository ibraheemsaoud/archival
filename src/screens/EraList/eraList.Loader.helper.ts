import { Params } from "react-router-dom";
import { requestTopic } from "../../requests/requestTopics";
import { requestEras } from "../../requests";

export const eraListLoader = async ({ params }: { params: Params<string> }) => {
  const { data: topic } = requestTopic({ slug: params.topicSlug });
  const { data: eras } = requestEras({ topicId: topic?.id || "-1" });

  return {
    topic,
    eras,
  };
};
