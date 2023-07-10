import { Box, Typography } from "@mui/material";
import { ITimelineEntry } from "../../../interfaces/timelineEntry.interface";

export const Media = ({ entry }: { entry: ITimelineEntry }) => {
  if (!entry.link) return null;
  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        {entry.title}
      </Typography>
      {entry.description && (
        <Typography variant="body1" gutterBottom>
          {entry.description}
        </Typography>
      )}
      <br />
      <Box
        component="img"
        sx={{
          height: 500,
          width: "100%",
          maxHeight: { xs: 350, lg: 500 },
          objectFit: "cover",
        }}
        alt={entry.title}
        src={entry.link}
      />
    </Box>
  );
};
