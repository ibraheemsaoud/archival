import { Params } from "react-router-dom";
import { requestTopics } from "../../requests/requestTopics";
import { requestEras } from "../../requests";

export const eraListLoader = async ({ params }: { params: Params<string> }) => {
  const { data: topics } = requestTopics();
  const topicId = topics.find((topic) => topic.id === params.topicId)?.id;
  const { data: eras } = requestEras({ topicId: topicId || "-1" });

  return {
    eras,
  };
};
