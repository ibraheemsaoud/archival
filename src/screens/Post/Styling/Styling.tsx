import { Box, Button, Typography } from "@mui/material";
import { IStyling } from "../../../interfaces/styling.interface";

export const Styling = ({ styling }: { styling: IStyling }) => {
  const commonProps: any = {
    width: "75px",
    height: "100px",
    borderRadius: 2,
    overflow: "hidden",
  };
  const imageProps = styling.imageUrl
    ? {
        backgroundImage: `url(${styling.imageUrl})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
      }
    : {};

  return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            background: "#8b8e8e",
            color: "#ffffff",
            ...commonProps,
            ...imageProps,
          }}
        />
        <Typography
          variant="body2"
          sx={{
            textOverflow: "ellipsis",
            overflow: "hidden",
            whiteSpace: "nowrap",
            maxWidth: "100px",
          }}
        >
          {styling.description}
        </Typography>
      </Box>
  );
};
