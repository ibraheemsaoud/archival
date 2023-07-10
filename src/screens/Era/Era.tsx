import { useLoaderData } from "react-router-dom";
import { IEra } from "../../interfaces/era.interface";
import { AppWrapper, Timeline } from "../../components";
import { Box, Button, Grid } from "@mui/material";
import { SuggestNewEntry } from "./Edit";
import { ITimelineEntry } from "../../interfaces/timelineEntry.interface";
import { EditEra } from "./Edit/EditEra";
import { ThemeProvider } from "@mui/material";
import { theme } from "../../theme";
import { CreateLink } from "./Edit/CreateLink";
import { useRequestPermissions } from "../../requests";
import { Server } from "../../config/server";
import { useEra } from "./useEra";
import { useState } from "react";

export const Era = () => {
  const [isEditing, setIsEditing] = useState(false);

  const { era: loaderEra, timeline } = useLoaderData() as any as {
    era: IEra;
    timeline: ITimelineEntry[];
  };
  const modedTheme = theme("light", loaderEra.accentColor);
  const { data: permissions } = useRequestPermissions(
    Server.eraCollectionId,
    loaderEra.id,
    loaderEra.$id
  );
  const { era, isLoading } = useEra(loaderEra.$id);

  if (isLoading) return <div>Loading...</div>;
  if (!era) return <div>Not found</div>;

  const handleStartEditMode = () => {
    if (isEditing) {
      window.location.reload();
    }
    setIsEditing(!isEditing);
  };

  console.log(isEditing);

  return (
    <ThemeProvider theme={modedTheme}>
      <AppWrapper>
        {permissions?.update && <EditEra />}
        <Box textAlign="center" marginTop={6}>
          <Timeline timeline={timeline} isEditing={isEditing} eraId={era.id} />
          <Grid
            container
            spacing={1}
            alignItems="flex-end"
            flexDirection="column"
            sx={{
              width: "auto",
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
            {permissions?.update && (
              <Grid item>
                <CreateLink />
              </Grid>
            )}
            {permissions?.update && (
              <Grid item>
                <Button variant="contained" onClick={handleStartEditMode}>
                  {isEditing ? "Save" : "Edit timeline"}
                </Button>
              </Grid>
            )}
          </Grid>
        </Box>
      </AppWrapper>
    </ThemeProvider>
  );
};
