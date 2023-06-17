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
            return <CoverPost coverPost={entry} key={entry.id} />;
          case EntryType.Collection:
            return <Collection collection={entry} key={entry.id} />;
          case EntryType.Media:
            return <Media media={entry} key={entry.id} />;
          case EntryType.QuickLinks:
            return <QuickLinks quickLinks={entry} key={entry.id} />;
          default:
            return <></>;
        }
      })}
    </>
  );
};
