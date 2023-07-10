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
    if (resp.data) {
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

  const onChange = (entry: ITimelineEntry) => {
    updateEntry(entry);
  };

  const onDelete = (entry: ITimelineEntry) => {
    deleteEntry(entry);
  };

  const onMoveDown = (entry: ITimelineEntry) => {
    const index = entries.findIndex((e) => e.$id === entry.$id);
    if (index === -1) {
      return;
    }
    if (index === entries.length - 1) {
      return;
    }
    // swap the order property of the two entries
    const newEntries = [...entries];
    const temp = newEntries[index].order;
    newEntries[index].order = newEntries[index + 1].order;
    newEntries[index + 1].order = temp;
    // update the database
    onChange(newEntries[index]);
    // send this request in 50ms
    setTimeout(() => {
      onChange(newEntries[index + 1]);
    }, 50);
  };

  const onMoveUp = (entry: ITimelineEntry) => {
    const index = entries.findIndex((e) => e.$id === entry.$id);
    if (index === -1) {
      return;
    }
    if (index === 0) {
      return;
    }
    // swap the order property of the two entries
    const newEntries = [...entries];
    const temp = newEntries[index].order;
    newEntries[index].order = newEntries[index - 1].order;
    newEntries[index - 1].order = temp;
    // update the database
    onChange(newEntries[index]);
    // send this request in 50ms
    setTimeout(() => {
      onChange(newEntries[index - 1]);
    }, 50);
  };

  return {
    entries,
    createNewEntry,
    onChange,
    onDelete,
    onMoveDown,
    onMoveUp,
  };
};
