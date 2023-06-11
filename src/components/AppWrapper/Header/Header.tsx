import { MouseEvent, useState } from "react";
import {
  AppBar,
  Avatar,
  Box,
  Button,
  IconButton,
  Link,
  Menu,
  MenuItem,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import { useUser } from "../../../hooks";
import { Navigation } from "./Navigation";
import { Link as NavLink } from "react-router-dom";
import { HOME } from "../../../consts/links.const";

export interface IHeader {
  title?: string;
}

const settings = ["Profile", "Account", "Dashboard", "Logout"];

export const Header = ({ title }: IHeader) => {
  const { isLoggedIn } = useUser();

  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

  const handleOpenUserMenu = (event: MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

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
          {isLoggedIn ? (
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map((setting) => (
                  <MenuItem key={setting} onClick={handleCloseUserMenu}>
                    <Typography textAlign="center">{setting}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          ) : (
            <Button color="inherit">Login</Button>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
};
