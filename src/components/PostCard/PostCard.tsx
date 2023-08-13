import { Box, Card, CardActionArea, CardMedia } from "@mui/material";
import { Link } from "react-router-dom";
import { BRAND } from "../../consts/links.const";
import { replaceRouteParams } from "../../helpers";
import { IPost } from "../../interfaces/post.interface";
import { PRIMARY_COLOR, SECONDARY_COLOR } from "../../consts/defaults.const";

export const PostCard = ({
  post,
  primaryColor = PRIMARY_COLOR,
  secondaryColor = SECONDARY_COLOR,
}: {
  post: IPost;
  primaryColor?: string;
  secondaryColor?: string;
}) => {
  const { pictureLink, $id } = post;
  const size = 40;

  const circleStyle = {
    width: 32,
    height: 32,
    position: "absolute",
    background: primaryColor,
    zIndex: 1,
    textAlign: "center",
    lineHeight: "32px",
    color: secondaryColor,
    borderRadius: 8,
    border: `1px solid ${secondaryColor}`,
  };

  return (
    <Card
      sx={{
        borderRadius: 4,
        position: "relative",
        width: `${size}%`,
        marginTop: `${50 - size}%`,
        overflow: "unset",
      }}
    >
      <Box
        sx={{
          overflow: "hidden",
          borderRadius: 4,
        }}
      >
        <Link to={replaceRouteParams(BRAND, { brandId: $id })}>
          <CardActionArea>
            <CardMedia
              component="img"
              image={pictureLink || "\\static\\images\\potm2209a.jpg"}
            />
          </CardActionArea>
        </Link>
      </Box>
      <Box
        sx={{
          ...circleStyle,
          top: -16,
          right: 12,
        }}
      >
        4
      </Box>

      <Box
        sx={{
          ...circleStyle,
          top: 10,
          right: -14,
        }}
      >
        4
      </Box>

      <Box
        sx={{
          ...circleStyle,
          top: 46,
          right: -14,
        }}
      >
        4
      </Box>
    </Card>
  );
};
