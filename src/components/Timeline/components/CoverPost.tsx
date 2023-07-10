import { Box, Grid, Typography } from "@mui/material";
import { ITimelineEntry } from "../../../interfaces/timelineEntry.interface";
import { useLoaderData } from "react-router-dom";
import { IEntry } from "../../../interfaces/entry.interface";

export const CoverPost = ({
  entry: TLEntry,
  minimalDisplay = false,
}: {
  entry: ITimelineEntry;
  minimalDisplay?: boolean;
}) => {
  const { entries } = useLoaderData() as any as { entries: IEntry[] };
  const entry = entries.find((e) => TLEntry.entryId === e.$id);

  if (!TLEntry.entryId || !entry) return null;
  return (
    <Box marginBottom={6}>
      {!minimalDisplay && (
        <Typography variant="h3" textAlign="center">
          {TLEntry.title}
        </Typography>
      )}
      {!minimalDisplay && TLEntry.description && (
        <Typography variant="body2" textAlign="center">
          {TLEntry.description}
        </Typography>
      )}
      <Box marginTop={4}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={2} />
          {entry.pictureUrl && (
            <Grid
              item
              xs={12}
              md={4}
              sx={{
                height: 500,
                maxHeight: { xs: 350, lg: 250 },
              }}
            >
              <Box
                component="img"
                sx={{
                  height: 500,
                  width: "100%",
                  maxHeight: { xs: 350, lg: 250 },
                  objectFit: "cover",
                }}
                alt={entry.title}
                src={entry.pictureUrl}
              />
            </Grid>
          )}
          <Grid item xs={12} md={4} sx={{ textAlign: "left" }}>
            <Typography variant="h5" gutterBottom>
              {entry.title}
            </Typography>
            <Typography variant="body2">{entry.text}</Typography>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};
