import { useEffect, useState } from "react";
import { useFirebase } from "../../../hooks";
import {
  ITimelineEntry,
  ITimelineEntryCreate,
} from "../../../interfaces/timelineEntry.interface";
import { Firestore } from "firebase/firestore";
import {
  requestCreateTimelineEntry,
  requestDeleteTimelineEntry,
  requestTimeline,
  requestUpdateTimelineEntry,
} from "../../../requests";

export const useTimelineEditor = (topicId?: string, eraId?: string) => {
  const { db } = useFirebase();
  const [entries, setEntries] = useState<ITimelineEntry[]>([]);
  const [error, setError] = useState<string | null>("");
  const [increment, setIncrement] = useState<number>(0);

  useEffect(() => {
    const getEntries = async (
      db: Firestore,
      topicId: string,
      eraId: string
    ) => {
      const resp = await requestTimeline(db, topicId, eraId);
      setEntries(resp.data);
      setError(resp.error);
    };
    if (db && topicId && eraId) {
      getEntries(db, topicId, eraId);
    }
  }, [db, topicId, eraId, increment]);

  const createNewEntry = async (entry: ITimelineEntryCreate) => {
    if (!db || !topicId || !eraId) {
      return;
    }
    const resp = await requestCreateTimelineEntry(db, topicId, eraId, entry);
    // TODO handle error
    // if (resp.error) {
    //   setError(resp.error);
    // } else
    if (resp) {
      setIncrement(increment + 1);
    }
  };

  const updateEntry = async (entry: ITimelineEntry) => {
    if (!db || !topicId || !eraId) {
      return;
    }
    const resp = await requestUpdateTimelineEntry(db, topicId, eraId, entry);
    if (resp) {
      setIncrement(increment + 1);
    }
  };

  const deleteEntry = async (entry: ITimelineEntry) => {
    if (!db || !topicId || !eraId) {
      return;
    }
    const resp = await requestDeleteTimelineEntry(db, topicId, eraId, entry);
    if (resp) {
      setIncrement(increment + 1);
    }
  };

  return { entries, createNewEntry, updateEntry, deleteEntry };
};
