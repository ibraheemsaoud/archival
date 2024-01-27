import {
  Box,
  Card,
  CardActionArea,
  CardMedia,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import { POST } from "../../consts/links.const";
import { replaceRouteParams } from "../../helpers";
import { PRIMARY_COLOR, SECONDARY_COLOR } from "../../consts/defaults.const";
import { ReactionBox } from "./ReactionBox";
import { IPost } from "../../interfaces/post.interface";

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
        overflow: "unset",
        height: "fit-content",
      }}
    >
      <Box
        sx={{
          overflow: "hidden",
          borderRadius: 4,
        }}
      >
        <Link to={replaceRouteParams(POST, { postId: $id })}>
          <CardActionArea>
            <CardMedia
              component="img"
              image={pictureLink || "\\static\\images\\placeholder.jpeg"}
              sx={{
                minHeight: "310px",
                maxHeight: "310px",
              }}
            />
            <ReactionBox
              post={post}
              primaryColor={primaryColor}
              secondaryColor={secondaryColor}
            />
          </CardActionArea>
        </Link>
        <Box
          sx={{
            position: "absolute",
            bottom: 0,
            color: secondaryColor,
            background: `${primaryColor}B0`,
            width: "100%",
            borderRadius: "0 0 12px 12px",
            padding: "8px",
            textAlign: "center",
          }}
        >
          <Typography color={secondaryColor}>{post.postTitle}</Typography>
        </Box>
      </Box>
    </Card>
  );
};
