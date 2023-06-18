import { useLoaderData } from "react-router-dom";
import { IEra } from "../../interfaces/era.interface";
import { AppWrapper, Timeline } from "../../components";
import { Box } from "@mui/material";
import { EditEra, SuggestNewEntry } from "./Edit";
import { useRoles } from "../../hooks";
import { ITimelineEntry } from "../../interfaces/timelineEntry.interface";

export const Era = () => {
  const { era, timeline } = useLoaderData() as any as {
    era: IEra;
    timeline: ITimelineEntry[];
  };
  const { hasEditAccess } = useRoles(era?.id);

  if (!era) return <div>Not found</div>;

  return (
    <AppWrapper>
      <Box textAlign="center" marginTop={6}>
        <Timeline timeline={timeline} />
        {era.allowSuggestions && <SuggestNewEntry />}
        {hasEditAccess && <EditEra />}
      </Box>
    </AppWrapper>
  );
};
