import { Params } from "react-router-dom";
import { requestTopics } from "../../requests/requestTopics";

export const topicLoader = async ({ params }: { params: Params<string> }) => {
  const { data: topics } = requestTopics();
  return {
    topic: topics.find((topic) => topic.id === params.topicId),
  };
};
