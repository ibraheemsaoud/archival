import { Params } from "react-router-dom";
import { requestTopic } from "../../requests/requestTopics";
import { Firestore } from "firebase/firestore";
import { requestEras } from "../../requests";

export const eraListLoader =
  (db: Firestore | null) =>
  async ({ params }: { params: Params<string> }) => {
    const { data: topic } = await requestTopic(db, params.topicId);
    const { data: eras } = await requestEras(db, params.topicId || "-1");

    return {
      topic,
      eras,
    };
  };
