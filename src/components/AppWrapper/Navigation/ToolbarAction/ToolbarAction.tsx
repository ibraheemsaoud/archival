import { useState, MouseEvent } from "react";
import {
  Avatar,
  Box,
  IconButton,
  Link,
  Menu,
  MenuItem,
  Tooltip,
  Typography,
} from "@mui/material";
import { Link as NavLink } from "react-router-dom";
import { Signin } from "./Signin";
import { useUser } from "../../../../hooks/useUser";
import { PROFILE } from "../../../../consts/links.const";
import { Loader } from "../../../Loader";

export const ToolbarAction = ({ shouldLogin }: { shouldLogin?: boolean }) => {
  const { user, isLoading, logout } = useUser();

  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const isLoggedIn = !!user;

  const handleOpenUserMenu = (event: MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const handleLogout = () => {
    logout();
    handleCloseUserMenu();
  };

  const handleProfileClick = () => {
    handleCloseUserMenu();
  };

  if (isLoading) return <Loader />;
  if (!isLoggedIn) {
    return <Signin shouldLogin={shouldLogin} />;
  }
  return (
    <Box sx={{ flexGrow: 0 }}>
      <Tooltip title="Open settings">
        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
          <Avatar
            alt={user.prefs?.displayName || user.name}
            src={user.prefs?.imageURL}
          />
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
          vertical: "bottom",
          horizontal: "left",
        }}
        open={Boolean(anchorElUser)}
        onClose={handleCloseUserMenu}
      >
        <Link underline="hover" component={NavLink} to={PROFILE}>
          <MenuItem onClick={handleProfileClick}>
            <Typography textAlign="center">Profile</Typography>
          </MenuItem>
        </Link>
        <MenuItem onClick={handleLogout}>
          <Typography textAlign="center">Logout</Typography>
        </MenuItem>
      </Menu>
    </Box>
  );
};
