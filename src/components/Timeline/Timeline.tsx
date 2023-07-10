import {
  EntryType,
  ITimelineEntry,
} from "../../interfaces/timelineEntry.interface";
import { Collection, CoverPost, Media, QuickLinks } from "./components";

export const Timeline = ({ timeline }: { timeline: ITimelineEntry[] }) => {
  return (
    <>
      {timeline.map((entry) => {
        switch (entry.type) {
          case EntryType.CoverPost:
            return <CoverPost entry={entry} key={entry.$id} />;
          case EntryType.Collection:
            return <Collection entry={entry} key={entry.$id} />;
          case EntryType.Media:
            return <Media entry={entry} key={entry.$id} />;
          case EntryType.QuickLinks:
            return <QuickLinks entry={entry} key={entry.$id} />;
          default:
            return <></>;
        }
      })}
    </>
  );
};
