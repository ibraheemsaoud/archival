import { requestTopics } from "../../requests/requestTopics";

export const topicListLoader = () => async () => {
  const { data: topics } = await requestTopics();

  return {
    topics,
  };
};
