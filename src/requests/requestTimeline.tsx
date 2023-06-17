import { Firestore, collection, getDocs } from "firebase/firestore";
import {
  EntryType,
  ITimelineEntry,
} from "../interfaces/timelineEntry.interface";

export const requestTimeline = async (
  db: Firestore | null,
  topicId?: string,
  eraId?: string
) => {
  if (!db || !topicId || !eraId) {
    return {
      data: [],
      error: "No db or topicId or eraId",
    };
  }

  const timelineSnashot = await getDocs(
    collection(db, "Topics", topicId, "Era", eraId, "timeline")
  );

  const timeline: ITimelineEntry[] = [];
  timelineSnashot.forEach((doc) => {
    const data = doc.data();
    if (data.type === EntryType.CoverPost) {
      timeline.push({
        id: doc.id,
        type: EntryType.CoverPost,
        description: data.description,
        title: data.title,
        entryId: data.entry,
      });
    } else if (data.type === EntryType.Collection) {
      timeline.push({
        id: doc.id,
        type: EntryType.Collection,
        title: data.title,
        entryIds: data.entries,
      });
    }
  });

  return {
    data: timeline,
    error: null,
  };
};
