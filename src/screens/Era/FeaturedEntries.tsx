import { Box, Button, Link } from "@mui/material";
import { IEra } from "../../interfaces/era.interface";
import { Link as NavLink, useLoaderData } from "react-router-dom";
import { replaceRouteParams } from "../../helpers";
import { ENTRY } from "../../consts/links.const";
import { IEntry } from "../../interfaces/entry.interface";
import { ITopic } from "../../interfaces/topic.interface";

export const FeaturedEntries = () => {
  const { topic, era, entries } = useLoaderData() as any as {
    topic: ITopic;
    era: IEra;
    entries: IEntry[];
  };
  if (!era || !era.featuredEntries || !era.featuredEntries.length) return null;

  return (
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
  );
};
