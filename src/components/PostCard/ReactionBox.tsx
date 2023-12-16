import { Box, Typography } from "@mui/material";
import { PRIMARY_COLOR, SECONDARY_COLOR } from "../../consts/defaults.const";
import { IPost } from "../../interfaces/post.interface";

export const ReactionBox = ({
  post,
  primaryColor = PRIMARY_COLOR,
  secondaryColor = SECONDARY_COLOR,
}: {
  post: IPost;
  primaryColor?: string;
  secondaryColor?: string;
}) => {
  const circleStyle = {
    width: 32,
    height: 32,
    minWidth: 32,
    background: primaryColor,
    textAlign: "center",
    lineHeight: "30px",
    color: secondaryColor,
    borderRadius: 2,
    border: `1px solid ${secondaryColor}`,
    marginBottom: 1,
  };
  return (
    <Box
      sx={{
        zIndex: 1,
        position: "absolute",
        top: 10,
        right: 8,
        width: 32,
        transition: "all 1s ease",
        overflow: "hidden",
        ":hover": {
          padding: "4px 8px",
          width: 150,
          right: 0,
          background: `${primaryColor}D0`,
          borderRadius: 2,
        },
      }}
    >
      <Box display="flex" alignItems="baseline" justifyContent="flex-start">
        <Box sx={circleStyle}>
          <Typography
            color={secondaryColor}
            fontWeight="bold"
            lineHeight="30px"
          >
            {post.stylingsCount || 0}
          </Typography>
        </Box>
        <Typography
          color={secondaryColor}
          fontWeight="bold"
          sx={{ marginLeft: 1 }}
        >
          Stylings
        </Typography>
      </Box>
      <Box display="flex" alignItems="baseline" justifyContent="flex-start">
        <Box sx={circleStyle}>
          <Typography
            color={secondaryColor}
            fontWeight="bold"
            lineHeight="30px"
          >
            {post.commentsCount || 0}
          </Typography>
        </Box>
        <Typography
          color={secondaryColor}
          fontWeight="bold"
          sx={{ marginLeft: 1 }}
        >
          Discussions
        </Typography>
      </Box>
      <Box display="flex" alignItems="baseline" justifyContent="flex-start">
        <Box sx={circleStyle}>
          <Typography
            color={secondaryColor}
            fontWeight="bold"
            lineHeight="30px"
          >
            {post.referencesCount || 0}
          </Typography>
        </Box>
        <Typography
          color={secondaryColor}
          fontWeight="bold"
          sx={{ marginLeft: 1 }}
        >
          References
        </Typography>
      </Box>
      {/* <Box display="flex" alignItems="baseline" justifyContent="flex-start">
        <Box sx={{ ...circleStyle, marginBottom: 0 }}>
          <Typography
            color={secondaryColor}
            fontWeight="bold"
            lineHeight="30px"
          >
            0
          </Typography>
        </Box>
        <Typography
          color={secondaryColor}
          fontWeight="bold"
          sx={{ marginLeft: 1 }}
        >
          Mentions
        </Typography>
      </Box> */}
    </Box>
  );
};
