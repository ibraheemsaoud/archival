import { useLoaderData } from "react-router-dom";
import { IEra } from "../../interfaces/era.interface";
import { AppWrapper, Timeline } from "../../components";
import { Box } from "@mui/material";
import { EditTimeline, SuggestNewEntry } from "./Edit";
import { useRoles } from "../../hooks";
import { ITimelineEntry } from "../../interfaces/timelineEntry.interface";
import { EditEra } from "./Edit/EditEra";

export const Era = () => {
  const { era, timeline } = useLoaderData() as any as {
    era: IEra;
    timeline: ITimelineEntry[];
  };
  const { hasEditAccess } = useRoles(era?.id);

  if (!era) return <div>Not found</div>;

  return (
    <AppWrapper>
      {hasEditAccess && <EditEra />}
      <Box textAlign="center" marginTop={6}>
        <Timeline timeline={timeline} />
        {era.allowSuggestions && <SuggestNewEntry />}
        {hasEditAccess && <EditTimeline />}
      </Box>
    </AppWrapper>
  );
};
