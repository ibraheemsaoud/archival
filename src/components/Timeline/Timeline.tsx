import { IEra } from "../../interfaces/era.interface";
import { EntryType } from "../../interfaces/timelineEntry.interface";
import { useRequestTimelineEntries } from "../../requests";
import { Collection, CoverPost, Media, QuickLinks } from "./components";

export const Timeline = ({ era }: { era: IEra }) => {
  const { timelineEntries } = era;
  const { data } = useRequestTimelineEntries(timelineEntries);
  return (
    <>
      {data.map((entry) => {
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
