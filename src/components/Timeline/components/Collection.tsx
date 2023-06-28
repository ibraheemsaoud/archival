import { Box, Grid, Typography } from "@mui/material";
import { ICollection } from "../../../interfaces/timelineEntry.interface";
import { EntryCard } from "./EntryCard";

export const Collection = ({ collection }: { collection: ICollection }) => {
  if (!collection.entries || collection.entries?.length === 0) return null;
  return (
    <Box marginBottom={6}>
      <Typography variant="h3" textAlign="center" gutterBottom>
        {collection.title}
      </Typography>
      {collection.entries && (
        <Grid container spacing={2} justifyContent="center">
          {collection.entries.map((entry) => (
            <Grid item xs={6} md={3} lg={2} key={entry.$id}>
              <EntryCard entry={entry} />
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};
