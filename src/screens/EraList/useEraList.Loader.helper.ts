import { Params } from "react-router-dom";
import { requestTopic } from "../../requests/requestTopics";
import { useRequestEras } from "../../requests";

export const useEraListLoader = async ({ params }: { params: Params<string> }) => {
  const { data: topic } = requestTopic({ slug: params.topicSlug });
  const { data: eras } = useRequestEras({ topicId: topic?.id || "-1" });

  return {
    topic,
    eras,
  };
};
