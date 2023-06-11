import { useLoaderData, Link as NavLink } from "react-router-dom";
import { IEra } from "../../interfaces/era.interface";
import { IEntry } from "../../interfaces/entry.interface";
import { AppWrapper } from "../../components";
import { replaceRouteParams } from "../../helpers";
import { ENTRY } from "../../consts/links.const";
import { ITopic } from "../../interfaces/topic.interface";
import { EntryCard } from "../../components/EntryCard";
import { Box, Typography, Link } from "@mui/material";
import { Masonry } from "@mui/lab";
import { FeaturedEntries } from "./FeaturedEntries";

export const Era = () => {
  const { topic, era, entries } = useLoaderData() as any as {
    topic: ITopic;
    era: IEra;
    entries: IEntry[];
  };

  if (!era) return <div>Not found</div>;
  if (!entries) return <div>Loading...</div>;

  // generate empty entries to fill between the real entries, the height of the empty entries depends on the time different between the real entries. 100px for 1 day
  entries.forEach((entry, index) => {
    if (index === 0) return;
    if (entry.variant === "empty") return;
    const prevEntry = entries[index - 1];
    if (prevEntry.variant === "empty") return;
    const timeDiff = prevEntry.timestamp.getTime() - entry.timestamp.getTime();
    console.log(timeDiff);
    const height = Math.abs(Math.floor(timeDiff / (24 * 3600 * 1000)) * 100);
    entries.splice(index, 0, {
      id: `empty-${index}`,
      variant: "empty",
      interaction: { height },
    });
  });

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
        <FeaturedEntries />
        <Box
          sx={(theme) => ({
            marginX: 2,
            [theme.breakpoints.up("lg")]: { marginX: 12 },
          })}
        >
          <Masonry columns={2} spacing={2}>
            {entries.map((entry) =>
              entry.variant === "empty" ? (
                <EntryCard key={entry.id} entry={entry} />
              ) : (
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
              )
            )}
          </Masonry>
        </Box>
      </Box>
    </AppWrapper>
  );
};
