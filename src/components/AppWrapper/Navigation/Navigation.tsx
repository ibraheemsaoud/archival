import { Box, Link, Typography } from "@mui/material";
import { Link as NavLink } from "react-router-dom";
import { HOME } from "../../../consts/links.const";
import { ToolbarAction } from "./ToolbarAction";
// import { Search } from "@mui/icons-material";

export const Navigation = () => {
  return (
    <Box
      sx={{
        maxWidth: 600,
        padding: 1,
        width: "inherit",
        display: "flex",
        justifyContent: "space-between",
        boxSizing: "border-box",
        backgroundColor: "#f7eee3",
      }}
    >
      <Link
        underline="none"
        component={NavLink}
        to={HOME}
        sx={{
          minWidth: 40,
          minHeight: 40,
          maxWidth: 40,
          maxHeight: 40,
          borderRadius: 40,
          background: "white",
          textAlign: "center",
        }}
      >
        <Typography
          variant="h5"
          sx={{
            lineHeight: "38px",
          }}
        >
          A
        </Typography>
      </Link>
      {/* <Typography
        variant="h5"
        sx={{
          minWidth: 40,
          minHeight: 40,
          maxWidth: 40,
          maxHeight: 40,
          borderRadius: 40,
          background: "white",
          textAlign: "center",
          lineHeight: "38px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Search />
      </Typography> */}
      <ToolbarAction />
    </Box>
  );
};
