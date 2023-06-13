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
            return <CoverPost coverPost={entry} />;
          case EntryType.Collection:
            return <Collection collection={entry} />;
          case EntryType.Media:
            return <Media media={entry} />;
          case EntryType.QuickLinks:
            return <QuickLinks quickLinks={entry} />;
          default:
            return <></>;
        }
      })}
    </>
  );
};
