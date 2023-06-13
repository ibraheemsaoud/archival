import { Box, Divider, Grid, Typography } from "@mui/material";
import { ICoverPost } from "../../../interfaces/timelineEntry.interface";
import { useRequestLinkPreview } from "../../../requests/external";

export const CoverPost = ({ coverPost }: { coverPost: ICoverPost }) => {
  const { data } = useRequestLinkPreview(coverPost.entry?.link);

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
          <Grid item xs={12} md={4}>
            <Box
              component="img"
              sx={{
                height: 500,
                width: "100%",
                maxHeight: { xs: 350, lg: 250 },
                objectFit: "cover",
              }}
              alt={data?.title}
              src={data?.image}
            />
          </Grid>
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
