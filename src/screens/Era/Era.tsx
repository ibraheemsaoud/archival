import { useLoaderData, Link as NavLink } from "react-router-dom";
import { IEra } from "../../interfaces/era.interface";
import { IEntry } from "../../interfaces/entry.interface";
import { AppWrapper } from "../../components";
import { replaceRouteParams } from "../../helpers";
import { ENTRY } from "../../consts/links.const";
import { ITopic } from "../../interfaces/topic.interface";
import { EntryCard } from "../../components/EntryCard";
import { Box, Typography, Link, Button, Grid } from "@mui/material";

export const Era = () => {
  const { topic, era, entries } = useLoaderData() as any as {
    topic: ITopic;
    era: IEra;
    entries: IEntry[];
  };
  if (!era) return <div>Not found</div>;
  if (!entries) return <div>Loading...</div>;
  return (
    <AppWrapper>
      <Box textAlign="center" marginTop={6}>
        <Typography variant="h5" gutterBottom>
          {era.title}
        </Typography>
        <Typography variant="body1" gutterBottom>
          {era.description}
        </Typography>
        <br />
        {era.coverImageUrl && (
          <Box
            component="img"
            sx={{
              height: 500,
              width: "100%",
              maxHeight: { xs: 350, lg: 500 },
              objectFit: "cover",
            }}
            alt={era.title}
            src={era.coverImageUrl}
          />
        )}
        {era.featuredEntries && era.featuredEntries.length > 0 && (
          <Box
            display="flex"
            flexWrap="wrap"
            justifyContent="center"
            sx={{ marginBottom: 6 }}
          >
            {era.featuredEntries.map((entryId) => {
              const entry = entries.find((entry) => entry.id === entryId);
              if (!entry) return null;
              return (
                <Link
                  key={entryId}
                  component={NavLink}
                  to={replaceRouteParams(ENTRY, {
                    topicSlug: topic.slug,
                    eraSlug: era.slug,
                    entryId: entryId,
                  })}
                  sx={{ marginLeft: 2 }}
                >
                  <Button variant="contained" sx={{ height: 35 }}>
                    {entry.title}
                  </Button>
                </Link>
              );
            })}
          </Box>
        )}
        <Grid container spacing={6}>
          {entries.map((entry) => (
            <Grid item xs={12} md={6} lg={6}>
              <Link
                key={entry.id}
                component={NavLink}
                underline="none"
                to={replaceRouteParams(ENTRY, {
                  topicSlug: topic.slug,
                  eraSlug: era.slug,
                  entryId: entry.id,
                })}
              >
                <EntryCard entry={entry} />
              </Link>
            </Grid>
          ))}
        </Grid>
      </Box>
    </AppWrapper>
  );
};
