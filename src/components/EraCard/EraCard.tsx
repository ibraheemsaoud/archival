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

export const EraCard = ({ era, topicSlug }: { era: IEra; topicSlug: string }) => {
  const { title, description } = era;
  return (
    <Card>
      <Link
        to={replaceRouteParams(ERA, {
          eraSlug: era.slug,
          topicSlug: topicSlug,
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
