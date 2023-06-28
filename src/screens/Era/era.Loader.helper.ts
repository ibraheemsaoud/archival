import { Params } from "react-router-dom";
import { requestEra } from "../../requests/requestEra";
import { requestEntries, requestTimeline, requestTopic } from "../../requests";

export const eraLoader =
  () =>
  async ({ params }: { params: Params<string> }) => {
    const [topic, era, timeline, entries] = await Promise.all([
      requestTopic(params.topicId),
      requestEra(params.eraId),
      requestTimeline(params.eraId),
      requestEntries(params.eraId),
    ]);
    // timeline.data.map((entry) => {
    //   if (entry.type === EntryType.Collection) {
    //     entry.entries = entries.data.filter((e) =>
    //       entry.entryIds.includes(e.id)
    //     );
    //   }
    //   if (entry.type === EntryType.CoverPost) {
    //     entry.entry = entries.data.find((e) => entry.entryId === e.id);
    //   }
    //   return entry;
    // });
    return {
      topic: topic.data,
      era: era.data,
      timeline: timeline.data,
      entries: entries.data,
    };
  };
