import { Box, Card, CardActionArea, CardMedia } from "@mui/material";
import { Link } from "react-router-dom";
import { BRAND } from "../../consts/links.const";
import { replaceRouteParams } from "../../helpers";
import { IPost } from "../../interfaces/post.interface";
import { PRIMARY_COLOR, SECONDARY_COLOR } from "../../consts/defaults.const";
import { ReactionBox } from "./ReactionBox";

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
      <ReactionBox
        post={post}
        primaryColor={primaryColor}
        secondaryColor={secondaryColor}
      />
    </Card>
  );
};
