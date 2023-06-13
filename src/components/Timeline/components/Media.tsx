import { Box, Typography } from "@mui/material";
import { IMedia } from "../../../interfaces/timelineEntry.interface";

export const Media = ({ media }: { media: IMedia }) => {
  if (!media.link) return null;
  if (media.entryType !== "image") return null;
  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        {media.title}
      </Typography>
      {media.description && (
        <Typography variant="body1" gutterBottom>
          {media.description}
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
        alt={media.title}
        src={media.link}
      />
    </Box>
  );
};
