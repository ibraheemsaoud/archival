import { Params } from "react-router-dom";
import {
  // requestComments,
  requestTopic,
  // useRequestEntry,
  requestEra,
} from "../../requests";
import { Firestore } from "firebase/firestore";

export const entryLoader =
  (db: Firestore | null) =>
  async ({ params }: { params: Params<string> }) => {
    const [topic, era] = await Promise.all([
      requestTopic(params.topicId),
      requestEra(db, params.topicId, params.eraId),
    ]);
    return {
      topic: topic.data,
      era: era.data,
      // entry,
      // comments,
    };
  };
