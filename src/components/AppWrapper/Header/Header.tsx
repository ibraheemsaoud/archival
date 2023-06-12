import { AppBar, Box, Link, Toolbar, Typography } from "@mui/material";
import { Navigation } from "./Navigation";
import { Link as NavLink } from "react-router-dom";
import { HOME } from "../../../consts/links.const";
import { ToolbarAction } from "./ToolbarAction";

export const Header = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Box>
            <Link underline="hover" component={NavLink} to={HOME}>
              <Typography
                variant="h5"
                paddingRight={2}
                marginRight={2}
                sx={(theme) => ({
                  borderRight: `1px solid ${theme.palette.divider}`,
                })}
              >
                <b>Archival</b>
              </Typography>
            </Link>
          </Box>
          <Box sx={{ flexGrow: 1 }}>
            <Navigation />
          </Box>
          <ToolbarAction />
        </Toolbar>
      </AppBar>
    </Box>
  );
};
