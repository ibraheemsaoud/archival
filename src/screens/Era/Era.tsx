import { useLoaderData } from "react-router-dom";
import { IEra } from "../../interfaces/era.interface";
import { AppWrapper, Timeline } from "../../components";
import { Box, Grid } from "@mui/material";
import { EditTimeline, SuggestNewEntry } from "./Edit";
import { ITimelineEntry } from "../../interfaces/timelineEntry.interface";
import { EditEra } from "./Edit/EditEra";
import { ThemeProvider } from "@mui/material";
import { theme } from "../../theme";
import { useUser } from "../../hooks";
import { CreateLink } from "./Edit/CreateLink";

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
          <Grid
            container
            spacing={1}
            alignItems="flex-end"
            flexDirection="column"
            sx={{
              position: "fixed",
              bottom: 8,
              right: 8,
            }}
          >
            {!era.disableSuggestions && (
              <Grid item>
                <SuggestNewEntry />
              </Grid>
            )}
            {isAdmin && (
              <Grid item>
                <CreateLink />
              </Grid>
            )}
            {isAdmin && (
              <Grid item>
                <EditTimeline />
              </Grid>
            )}
          </Grid>
        </Box>
      </AppWrapper>
    </ThemeProvider>
  );
};
