import {
  ITimelineEntry,
  ITimelineEntryCreate,
} from "../interfaces/timelineEntry.interface";
import api from "./apis";
import { Server } from "../config/server";
import { Query } from "appwrite";

export const requestTimeline = async (eraId?: string) => {
  if (!eraId) {
    return {
      data: [] as ITimelineEntry[],
      error: "No eraId",
    };
  }
  const data = await api.listDocuments(
    Server.databaseID,
    Server.timelineEntryCollectionId,
    [Query.equal("EraId", [eraId]), Query.orderAsc("order")]
  );
  if (data.documents) {
    return {
      data: data.documents as ITimelineEntry[],
      error: undefined,
    };
  }
  return {
    data: [] as ITimelineEntry[],
    error: "No data",
  };
};

export const requestCreateTimelineEntry = async (
  topicId: string,
  eraId: string,
  entry: ITimelineEntryCreate
) => {
  if (!topicId || !eraId || !entry) return false;

  // await addDoc(collection(db, "Topics", topicId, "Era", eraId, "timeline"), {
  //   ...entry,
  // });
  return true;
};

export const requestUpdateTimelineEntry = async (
  topicId: string,
  eraId: string,
  entry: ITimelineEntry
) => {
  if (!topicId || !eraId || !entry) return false;

  // await setDoc(doc(db, "Topics", topicId, "Era", eraId, "timeline", entry.id), {
  //   ...entry,
  // });
  return true;
};

export const requestDeleteTimelineEntry = async (
  topicId: string,
  eraId: string,
  entry: ITimelineEntry
) => {
  if (!topicId || !eraId || !entry) return false;

  // await deleteDoc(
  //   doc(db, "Topics", topicId, "Era", eraId, "timeline", entry.id)
  // );
  return true;
};
