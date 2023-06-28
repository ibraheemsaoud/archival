import { useEffect, useState } from "react";
import {
  ITimelineEntry,
  ITimelineEntryCreate,
} from "../../../interfaces/timelineEntry.interface";
import {
  requestCreateTimelineEntry,
  requestDeleteTimelineEntry,
  requestTimeline,
  requestUpdateTimelineEntry,
} from "../../../requests";

export const useTimelineEditor = (topicId?: string, eraId?: string) => {
  const [entries, setEntries] = useState<ITimelineEntry[]>([]);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [error, setError] = useState<string | undefined>("");
  const [increment, setIncrement] = useState<number>(0);

  useEffect(() => {
    const getEntries = async (
      eraId: string
    ) => {
      const resp = await requestTimeline(eraId);
      setEntries(resp.data);
      setError(resp.error);
    };
    if (eraId) {
      getEntries(eraId);
    }
  }, [eraId, increment]);

  const createNewEntry = async (entry: ITimelineEntryCreate) => {
    if (!topicId || !eraId) {
      return;
    }
    const resp = await requestCreateTimelineEntry(topicId, eraId, entry);
    // TODO handle error
    // if (resp.error) {
    //   setError(resp.error);
    // } else
    if (resp) {
      setIncrement(increment + 1);
    }
  };

  const updateEntry = async (entry: ITimelineEntry) => {
    if (!topicId || !eraId) {
      return;
    }
    const resp = await requestUpdateTimelineEntry(topicId, eraId, entry);
    if (resp) {
      setIncrement(increment + 1);
    }
  };

  const deleteEntry = async (entry: ITimelineEntry) => {
    if (!topicId || !eraId) {
      return;
    }
    const resp = await requestDeleteTimelineEntry(topicId, eraId, entry);
    if (resp) {
      setIncrement(increment + 1);
    }
  };

  return { entries, createNewEntry, updateEntry, deleteEntry };
};
