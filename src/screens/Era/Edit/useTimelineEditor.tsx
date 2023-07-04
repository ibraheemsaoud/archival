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
import { toast } from "react-hot-toast";

export const useTimelineEditor = (eraId?: string) => {
  const [entries, setEntries] = useState<ITimelineEntry[]>([]);
  const [increment, setIncrement] = useState<number>(0);

  useEffect(() => {
    const getEntries = async (eraId: string) => {
      const resp = await requestTimeline(eraId);
      setEntries(resp.data);
      if (resp.error) {
        toast.error(resp.error);
      }
    };
    if (eraId) {
      getEntries(eraId);
    }
  }, [eraId, increment]);

  const createNewEntry = async (entry: ITimelineEntryCreate) => {
    if (!eraId) {
      return {
        error: "No eraId",
        data: undefined,
      };
    }
    const { error } = await requestCreateTimelineEntry(eraId, entry);
    if (error) {
      toast.error(error);
    } else {
      setIncrement(increment + 1);
    }
  };

  const updateEntry = async (entry: ITimelineEntry) => {
    if (!eraId) {
      return;
    }
    const resp = await requestUpdateTimelineEntry(eraId, entry);
    if (resp) {
      setIncrement(increment + 1);
    }
  };

  const deleteEntry = async (entry: ITimelineEntry) => {
    if (!eraId) {
      return;
    }
    const resp = await requestDeleteTimelineEntry(eraId, entry);
    if (resp) {
      setIncrement(increment + 1);
    }
  };

  return { entries, createNewEntry, updateEntry, deleteEntry };
};
