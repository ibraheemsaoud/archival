import { Params } from "react-router-dom";
import { requestEra } from "../../requests/requestEra";
import { requestEntries, requestTimeline, requestTopic } from "../../requests";
import { EntryType } from "../../interfaces/timelineEntry.interface";
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
    timeline.data = timeline.data.map((entry) => {
      if (entry.type === EntryType.Collection) {
        entry.entries = entries.data.filter((e) =>
          entry.entryIds?.includes(e.$id)
        );
      }
      if (entry.type === EntryType.CoverPost) {
        entry.entry = entries.data.find((e) => entry.entryId === e.$id);
      }
      if (entry.type === EntryType.QuickLinks) {
        entry.linksData = links.data.filter((l) =>
          entry.links?.includes(l.$id)
        );
      }
      return entry;
    });
    console.log(entries.data);
    console.log(timeline.data);
    return {
      topic: topic.data,
      era: era.data,
      timeline: timeline.data,
      entries: entries.data,
    };
  };
