import { useLoaderData } from "react-router-dom";
import { IEra } from "../../interfaces/era.interface";
import { AppWrapper, Timeline } from "../../components";
import { Box } from "@mui/material";
import { EditTimeline, SuggestNewEntry } from "./Edit";
import { ITimelineEntry } from "../../interfaces/timelineEntry.interface";
import { EditEra } from "./Edit/EditEra";
import { ThemeProvider } from "@mui/material";
import { theme } from "../../theme";

export const Era = () => {
  const { era, timeline } = useLoaderData() as any as {
    era: IEra;
    timeline: ITimelineEntry[];
  };
  const modedTheme = theme("light", era.accentColor);
  const hasEditAccess = false;

  if (!era) return <div>Not found</div>;

  return (

    <ThemeProvider theme={modedTheme}>
    <AppWrapper>
      
      {hasEditAccess && <EditEra />}
      <Box textAlign="center" marginTop={6}>
        <Timeline timeline={timeline} />
        {!era.disableSuggestions && <SuggestNewEntry />}
        {hasEditAccess && <EditTimeline />}
      </Box>
    </AppWrapper>
    </ThemeProvider>
  );
};
