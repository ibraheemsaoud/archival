import { Box, Button, Link } from "@mui/material";
import { Link as NavLink } from "react-router-dom";
import { ILink, IQuickLinks, ITimelineEntry } from "../../../interfaces/timelineEntry.interface";

export const QuickLinks = ({ entry }: { entry: ITimelineEntry }) => {
  console.log(entry);
  const quickLinks: IQuickLinks = {
    ...entry,
    links: entry.linksData || [] as ILink[],
  }
  if (!quickLinks.links.length) return null;

  return (
    <Box
      display="flex"
      flexWrap="wrap"
      justifyContent="center"
      flexDirection={{ xs: "column", sm: "row" }}
      sx={{ marginBottom: 6 }}
    >
      {quickLinks.links.map((link, index) => {
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
