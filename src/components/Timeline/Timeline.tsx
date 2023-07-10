import {
  EntryType,
  ITimelineEntry,
} from "../../interfaces/timelineEntry.interface";
import { TimelineEntryCreator } from "../../screens/Era/Edit";
import { EditCollection } from "../../screens/Era/Edit/TimelineEntry/EditCollection";
import { EditCoverPost } from "../../screens/Era/Edit/TimelineEntry/EditCoverPost";
import { EditMedia } from "../../screens/Era/Edit/TimelineEntry/EditMedia";
import { EditQuickLinks } from "../../screens/Era/Edit/TimelineEntry/EditQuickLinks";
import { useTimelineEditor } from "../../screens/Era/Edit/useTimelineEditor";
import { Collection, CoverPost, Media, QuickLinks } from "./components";

export const Timeline = ({
  timeline,
  isEditing,
  eraId,
}: {
  timeline: ITimelineEntry[];
  isEditing: boolean;
  eraId: string;
}) => {
  const { entries, createNewEntry, onChange, onDelete, onMoveDown, onMoveUp } =
    useTimelineEditor(eraId);

  return (
    <>
      {isEditing && (
        <TimelineEntryCreator
          entries={entries}
          createNewEntry={createNewEntry}
          eraId={eraId}
        />
      )}
      {timeline.map((entry) => {
        switch (entry.type) {
          case EntryType.CoverPost:
            return isEditing ? (
              <EditCoverPost
                key={entry.$id}
                entry={entry}
                onChange={onChange}
                onDelete={onDelete}
                onMoveDown={onMoveDown}
                onMoveUp={onMoveUp}
              />
            ) : (
              <CoverPost entry={entry} key={entry.$id} />
            );
          case EntryType.Collection:
            return isEditing ? (
              <EditCollection
                key={entry.$id}
                entry={entry}
                onChange={onChange}
                onDelete={onDelete}
                onMoveDown={onMoveDown}
                onMoveUp={onMoveUp}
              />
            ) : (
              <Collection entry={entry} key={entry.$id} />
            );
          case EntryType.Media:
            return isEditing ? (
              <EditMedia
                key={entry.$id}
                entry={entry}
                onChange={onChange}
                onDelete={onDelete}
                onMoveDown={onMoveDown}
                onMoveUp={onMoveUp}
              />
            ) : (
              <Media entry={entry} key={entry.$id} />
            );
          case EntryType.QuickLinks:
            return isEditing ? (
              <EditQuickLinks
                key={entry.$id}
                entry={entry}
                onChange={onChange}
                onDelete={onDelete}
                onMoveDown={onMoveDown}
                onMoveUp={onMoveUp}
              />
            ) : (
              <QuickLinks entry={entry} key={entry.$id} />
            );
          default:
            return <></>;
        }
      })}
    </>
  );
};
