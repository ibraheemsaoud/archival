import { AppBar, Box, Link, Toolbar, Typography } from "@mui/material";
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
                  display: "flex",
                  alignItems: "center",
                })}
              >
                <img
                  src="/imageedit_1_5112916119.png"
                  alt="logo"
                  width={50}
                  height={50}
                />
                <Box sx={{ display: { md: "block", xs: "none" } }}>
                  <b>Archival</b>
                </Box>
              </Typography>
            </Link>
          </Box>
          <ToolbarAction />
        </Toolbar>
      </AppBar>
    </Box>
  );
};
