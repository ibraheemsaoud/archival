import { requestTopics } from "../../requests/requestTopics";
import { Firestore } from "firebase/firestore";

export const topicListLoader = (db: Firestore | null) => async () => {
  const { data: topics } = await requestTopics(db);

  return {
    topics,
  };
};
