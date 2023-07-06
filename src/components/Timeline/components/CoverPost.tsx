import { Box, Grid, Typography } from "@mui/material";
import { ICoverPost } from "../../../interfaces/timelineEntry.interface";

export const CoverPost = ({ coverPost }: { coverPost: ICoverPost }) => {
  if (!coverPost.entry) return null;
  return (
    <Box marginBottom={6}>
      <Typography variant="h3" textAlign="center">
        {coverPost.title}
      </Typography>
      {coverPost.description && (
        <Typography variant="body2" textAlign="center">
          {coverPost.description}
        </Typography>
      )}
      <Box marginTop={4}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={2} />
          {coverPost.entry?.pictureUrl && (
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
                alt={coverPost.entry?.title}
                src={coverPost.entry?.pictureUrl}
              />
            </Grid>
          )}
          <Grid item xs={12} md={4} sx={{ textAlign: "left" }}>
            <Typography variant="h5" gutterBottom>
              {coverPost.entry.title}
            </Typography>
            <Typography variant="body2">{coverPost.entry.text}</Typography>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};
