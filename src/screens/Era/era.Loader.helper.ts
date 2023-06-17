import { Params } from "react-router-dom";
import { requestEra } from "../../requests/requestEra";
import { requestEntries, requestTimeline, requestTopic } from "../../requests";
import { Firestore } from "firebase/firestore";
import { EntryType } from "../../interfaces/timelineEntry.interface";

export const eraLoader =
  (db: Firestore | null) =>
  async ({ params }: { params: Params<string> }) => {
    const { data: topic } = await requestTopic(db, params.topicId);
    const { data: era } = await requestEra(db, params.topicId, params.eraId);
    const { data: timeline } = await requestTimeline(
      db,
      params.topicId,
      params.eraId
    );
    const { data: entries } = await requestEntries(
      db,
      params.topicId,
      params.eraId
    );
    timeline.map((entry) => {
      if (entry.type === EntryType.Collection) {
        entry.entries = entries.filter((e) => entry.entryIds.includes(e.id));
      }
      if (entry.type === EntryType.CoverPost) {
        entry.entry = entries.find((e) => entry.entryId === e.id);
      }
      return entry;
    });
    return {
      topic,
      era,
      timeline,
    };
  };
