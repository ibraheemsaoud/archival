import { Box, Grid, Typography } from "@mui/material";
import { ITimelineEntry } from "../../../interfaces/timelineEntry.interface";
import { EntryCard } from "./EntryCard";
import { IEntry } from "../../../interfaces/entry.interface";
import { useLoaderData } from "react-router-dom";

export const Collection = ({
  entry,
  minimalDisplay = false,
}: {
  entry: ITimelineEntry;
  minimalDisplay?: boolean;
}) => {
  const { entries } = useLoaderData() as any as {
    entries: IEntry[];
  };
  const collectionEntries = entries.filter((collectionEntry) =>
    entry.entryIds?.includes(collectionEntry.$id)
  );
  if (!collectionEntries || collectionEntries.length === 0) return null;
  return (
    <Box marginBottom={6}>
      {!minimalDisplay && (
        <Typography variant="h3" textAlign="center" gutterBottom>
          {entry.title}
        </Typography>
      )}
      {collectionEntries && (
        <Grid container spacing={2} justifyContent="center">
          {collectionEntries.map((entry) => (
            <Grid item xs={6} md={3} lg={2} key={entry.$id}>
              <EntryCard entry={entry} />
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};
