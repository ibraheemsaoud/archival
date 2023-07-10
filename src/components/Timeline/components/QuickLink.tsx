import { Box, Button, Link } from "@mui/material";
import { Link as NavLink, useLoaderData } from "react-router-dom";
import {
  ILink,
  ITimelineEntry,
} from "../../../interfaces/timelineEntry.interface";

export const QuickLinks = ({ entry }: { entry: ITimelineEntry }) => {
  const { links } = useLoaderData() as any as {
    links: ILink[];
  };

  if (!entry.links?.length) return null;

  const linksData = links.filter((l) => entry.links?.includes(l.$id));

  return (
    <Box
      display="flex"
      flexWrap="wrap"
      justifyContent="center"
      flexDirection={{ xs: "column", sm: "row" }}
      sx={{ marginBottom: 6 }}
    >
      {linksData.map((link, index) => {
        return (
          <Link
            key={`${link.title}-${index}`}
            component={NavLink}
            to={link.link}
            sx={{
              marginBottom: { xs: 1, sm: 1 },
              marginLeft: { xs: 0, sm: 1 },
              marginRight: { xs: 0, sm: 1 },
              width: { xs: "100%", sm: "auto" },
            }}
            target="_blank"
          >
            <Button
              variant="contained"
              sx={{
                height: 35,
                minWidth: 220,
                width: {
                  xs: "100%",
                  sm: "auto",
                },
              }}
            >
              {link.title}
            </Button>
          </Link>
        );
      })}
    </Box>
  );
};
