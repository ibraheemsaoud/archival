import { Box, Card, CardActionArea, CardMedia } from "@mui/material";
import { Link } from "react-router-dom";
import { BRAND } from "../../consts/links.const";
import { replaceRouteParams } from "../../helpers";
import { IPost } from "../../interfaces/post.interface";

export const PostCard = ({ post }: { post: IPost }) => {
  const { pictureLink, $id } = post;
  return (
    <Card
      sx={{
        borderRadius: 4,
        position: "relative",
        padding: "25%",
        width: "50%",
      }}
    >
      <Box
        sx={{
          position: "absolute",
          top: 0,
          right: "-100%",
        }}
      >
        <Link to={replaceRouteParams(BRAND, { brandId: $id })}>
          <CardActionArea>
            <CardMedia
              component="img"
              sx={{
                width: "50% !important",
              }}
              image={pictureLink || "\\static\\images\\potm2209a.jpg"}
            />
          </CardActionArea>
        </Link>
      </Box>
    </Card>
  );
};
