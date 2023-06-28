import { Params } from "react-router-dom";
import {
  // requestComments,
  requestTopic,
  // useRequestEntry,
  requestEra,
} from "../../requests";

export const entryLoader =
  () =>
  async ({ params }: { params: Params<string> }) => {
    const [topic, era] = await Promise.all([
      requestTopic(params.topicId),
      requestEra(params.eraId),
    ]);
    return {
      topic: topic.data,
      era: era.data,
      // entry,
      // comments,
    };
  };
