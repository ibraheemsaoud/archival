import { Params } from "react-router-dom";
import { requestEra } from "../../requests/requestEra";
import { requestEntries, requestTimeline, requestTopic } from "../../requests";
import { requestLinks } from "../../requests/requestLinks";

export const eraLoader =
  () =>
  async ({ params }: { params: Params<string> }) => {
    const [topic, era, timeline, entries, links] = await Promise.all([
      requestTopic(params.topicId),
      requestEra(params.eraId),
      requestTimeline(params.eraId),
      requestEntries(params.eraId),
      requestLinks(params.eraId),
    ]);

    return {
      topic: topic.data,
      era: era.data,
      timeline: timeline.data,
      entries: entries.data,
      links: links.data,
    };
  };
