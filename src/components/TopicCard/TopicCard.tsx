import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import { ITopic } from "../../interfaces/topic.interface";
import { TOPIC } from "../../consts/links.const";
import { replaceRouteParams } from "../../helpers";

export const TopicCard = ({ topic }: { topic: ITopic }) => {
  const { title, id, description, coverImageUrl } = topic;
  return (
    <Card sx={{ maxWidth: 200 }}>
      <Link to={replaceRouteParams(TOPIC, { topicId: id })}>
        <CardActionArea>
          <CardMedia
            component="img"
            height="140"
            image={coverImageUrl || "\\static\\images\\potm2209a.jpg"}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {description}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Link>
    </Card>
  );
};
