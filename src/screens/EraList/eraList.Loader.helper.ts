import { Params } from "react-router-dom";
import { requestTopic } from "../../requests/requestTopics";
import { Firestore } from "firebase/firestore";
import { requestEras } from "../../requests";

export const eraListLoader =
  (db: Firestore | null) =>
  async ({ params }: { params: Params<string> }) => {
    const [topic, eras] = await Promise.all([
      requestTopic(db, params.topicId),
      requestEras(db, params.topicId || "-1"),
    ]);
    return {
      topic: topic.data,
      eras: eras.data,
    };
  };
