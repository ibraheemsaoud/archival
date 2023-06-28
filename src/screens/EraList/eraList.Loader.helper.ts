import { Params } from "react-router-dom";
import { requestTopic } from "../../requests/requestTopics";
import { requestEras } from "../../requests";

export const eraListLoader =
  () =>
  async ({ params }: { params: Params<string> }) => {
    const [topic, eras] = await Promise.all([
      requestTopic(params.topicId),
      requestEras(params.topicId || "-1"),
    ]);
    return {
      topic: topic.data,
      eras: eras.data,
    };
  };
