import { Params } from "react-router-dom";
import { requestEra } from "../../requests/requestEra";
import { requestEntries, requestTimeline, requestTopic } from "../../requests";
import { Firestore } from "firebase/firestore";
import { EntryType } from "../../interfaces/timelineEntry.interface";

export const eraLoader =
  (db: Firestore | null) =>
  async ({ params }: { params: Params<string> }) => {
    const [topic, era, timeline, entries] = await Promise.all([
      requestTopic(params.topicId),
      requestEra(db, params.topicId, params.eraId),
      requestTimeline(db, params.topicId, params.eraId),
      requestEntries(db, params.topicId, params.eraId),
    ]);
    timeline.data.map((entry) => {
      if (entry.type === EntryType.Collection) {
        entry.entries = entries.data.filter((e) =>
          entry.entryIds.includes(e.id)
        );
      }
      if (entry.type === EntryType.CoverPost) {
        entry.entry = entries.data.find((e) => entry.entryId === e.id);
      }
      return entry;
    });
    const sortedTimeline = timeline.data.sort(
      (a, b) => (a.order || 0) - (b.order || 0)
    );
    return {
      topic: topic.data,
      era: era.data,
      timeline: sortedTimeline,
      entries: entries.data,
    };
  };
