import {
  Firestore,
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  orderBy,
  query,
  setDoc,
} from "firebase/firestore";
import {
  EntryType,
  ITimelineEntry,
  ITimelineEntryCreate,
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
    query(
      collection(db, "Topics", topicId, "Era", eraId, "timeline"),
      orderBy("order")
    )
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
        order: data.order,
      });
    } else if (data.type === EntryType.Collection) {
      timeline.push({
        id: doc.id,
        type: EntryType.Collection,
        title: data.title,
        entryIds: data.entries,
        order: data.order,
      });
    } else if (data.type === EntryType.QuickLinks) {
      timeline.push({
        id: doc.id,
        type: EntryType.QuickLinks,
        links: data.links,
        order: data.order,
      });
    } else if (data.type === EntryType.Media) {
      timeline.push({
        id: doc.id,
        type: EntryType.Media,
        title: data.title,
        description: data.description,
        timestamp: new Date(data.timestamp.seconds * 1000),
        entryType: data.entryType,
        link: data.link,
        order: data.order,
      });
    }
  });

  return {
    data: timeline,
    error: null,
  };
};

export const requestCreateTimelineEntry = async (
  db: Firestore | null,
  topicId: string,
  eraId: string,
  entry: ITimelineEntryCreate
) => {
  if (!db || !topicId || !eraId || !entry) return false;

  await addDoc(collection(db, "Topics", topicId, "Era", eraId, "timeline"), {
    ...entry,
  });
  return true;
};

export const requestUpdateTimelineEntry = async (
  db: Firestore | null,
  topicId: string,
  eraId: string,
  entry: ITimelineEntry
) => {
  if (!db || !topicId || !eraId || !entry) return false;

  await setDoc(doc(db, "Topics", topicId, "Era", eraId, "timeline", entry.id), {
    ...entry,
  });
  return true;
};

export const requestDeleteTimelineEntry = async (
  db: Firestore | null,
  topicId: string,
  eraId: string,
  entry: ITimelineEntry
) => {
  if (!db || !topicId || !eraId || !entry) return false;

  await deleteDoc(
    doc(db, "Topics", topicId, "Era", eraId, "timeline", entry.id)
  );
  return true;
};
