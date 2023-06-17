import { useLoaderData } from "react-router-dom";
import { IEra } from "../../interfaces/era.interface";
import { AppWrapper, Timeline } from "../../components";
import { Box } from "@mui/material";
import { EditEra, SuggestNewEntry } from "./Edit";
import { useRoles } from "../../hooks";
import { ITopic } from "../../interfaces/topic.interface";
import { ITimelineEntry } from "../../interfaces/timelineEntry.interface";

export const Era = () => {
  const { topic, era, timeline } = useLoaderData() as any as {
    era: IEra;
    topic: ITopic;
    timeline: ITimelineEntry[];
  };
  const { hasEditAccess } = useRoles(era?.id);

  if (!era) return <div>Not found</div>;

  return (
    <AppWrapper>
      <Box textAlign="center" marginTop={6}>
        <Timeline timeline={timeline} />
        {era.allowSuggestions && <SuggestNewEntry eraId={era.id} />}
        {hasEditAccess && <EditEra era={era} />}
      </Box>
    </AppWrapper>
  );
};
