import { useLoaderData } from "react-router-dom";
import { IEra } from "../../interfaces/era.interface";
import { AppWrapper, Timeline } from "../../components";
import { Box } from "@mui/material";
import { EditTimeline, SuggestNewEntry } from "./Edit";
import { ITimelineEntry } from "../../interfaces/timelineEntry.interface";
import { EditEra } from "./Edit/EditEra";
import { ThemeProvider } from "@mui/material";
import { theme } from "../../theme";
import { useUser } from "../../hooks";

export const Era = () => {
  const { era, timeline } = useLoaderData() as any as {
    era: IEra;
    timeline: ITimelineEntry[];
  };
  const modedTheme = theme("light", era.accentColor);
  const { isAdmin } = useUser();

  if (!era) return <div>Not found</div>;

  return (

    <ThemeProvider theme={modedTheme}>
    <AppWrapper>
      
      {isAdmin && <EditEra />}
      <Box textAlign="center" marginTop={6}>
        <Timeline timeline={timeline} />
        {!era.disableSuggestions && <SuggestNewEntry />}
        {isAdmin && <EditTimeline />}
      </Box>
    </AppWrapper>
    </ThemeProvider>
  );
};
