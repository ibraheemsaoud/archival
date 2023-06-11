import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import { IEra } from "../../interfaces/era.interface";
import { Link } from "react-router-dom";
import { replaceRouteParams } from "../../helpers";
import { ERA } from "../../consts/links.const";
import { ITopic } from "../../interfaces/topic.interface";

export const EraCard = ({ era, topic }: { era: IEra; topic: ITopic }) => {
  const { title, description } = era;
  return (
    <Card>
      <Link
        to={replaceRouteParams(ERA, {
          eraSlug: era.slug,
          topicSlug: topic.slug,
        })}
      >
        <CardActionArea>
          <CardMedia
            component="img"
            height="360"
            image="\static\images\potm2209a.jpg"
            alt="green iguana"
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
