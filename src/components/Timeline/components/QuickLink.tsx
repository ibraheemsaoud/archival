import { Box, Button, Link } from "@mui/material";
import { Link as NavLink } from "react-router-dom";
import { IQuickLinks } from "../../../interfaces/timelineEntry.interface";

export const QuickLinks = ({ quickLinks }: { quickLinks: IQuickLinks }) => {
  if (!quickLinks.links.length) return null;

  return (
    <Box
      display="flex"
      flexWrap="wrap"
      justifyContent="center"
      flexDirection={{ xs: "column", sm: "row" }}
      sx={{ marginBottom: 6 }}
    >
      {quickLinks.links.map((link) => {
        return (
          <Link
            key={link.order}
            component={NavLink}
            to={link.link}
            sx={{
              marginBottom: { xs: 1, sm: 0 },
              marginLeft: { xs: 0, sm: link.order !== 1 ? 2 : 0 },
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
