import { requestTopics } from "../../requests";

export const topicListLoader = async () => {
  const { data: topics } = requestTopics();

  return {
    topics,
  };
};
