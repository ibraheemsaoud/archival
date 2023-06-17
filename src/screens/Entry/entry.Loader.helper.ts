import { Params } from "react-router-dom";
import {
  requestComments,
  requestTopic,
  // useRequestEntry,
  requestEra,
  // useRequestTopic,
} from "../../requests";
import { Firestore } from "firebase/firestore";

export const entryLoader =
  (db: Firestore | null) =>
  async ({ params }: { params: Params<string> }) => {
    const { data: topic } = await requestTopic(db, params.topicId);
    const { data: era } = await requestEra(db, params.topicId, params.eraId);
    // const { data: entry } = useRequestEntry(params.entryId || "-1");
    // const { data: comments } = requestComments(params.entryId || "-1");
    return {
      topic,
      era,
      // entry,
      // comments,
    };
  };
