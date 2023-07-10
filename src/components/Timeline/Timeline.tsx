import {
  EntryType,
  ICollection,
  ICoverPost,
  IMedia,
  ITimelineEntry,
} from "../../interfaces/timelineEntry.interface";
import { EditQuickLinks } from "../../screens/Era/Edit/TimelineEntry/EditQuickLinks";
import { Collection, CoverPost, Media, QuickLinks } from "./components";

export const Timeline = ({ timeline }: { timeline: ITimelineEntry[] }) => {
  return (
    <>
      {timeline.map((entry) => {
        switch (entry.type) {
          case EntryType.CoverPost:
            const coverPost: ICoverPost = {
              ...entry,
              type: EntryType.CoverPost,
              title: entry.title || "",
              entryId: entry.entryId || "",
            };
            return <CoverPost coverPost={coverPost} key={entry.$id} />;
          case EntryType.Collection:
            const collection: ICollection = {
              ...entry,
              type: EntryType.Collection,
              title: entry.title || "",
              entryIds: entry.entryIds || ([] as string[]),
            };
            return <Collection collection={collection} key={entry.$id} />;
          case EntryType.Media:
            const media: IMedia = {
              ...entry,
              type: EntryType.Media,
              title: entry.title || "",
              link: entry.link || "",
              timestamp: entry.timestamp || new Date(),
            };
            return <Media media={media} key={entry.$id} />;
          case EntryType.QuickLinks:
            return <QuickLinks entry={entry} key={entry.$id} />;
          default:
            return <></>;
        }
      })}
    </>
  );
};
