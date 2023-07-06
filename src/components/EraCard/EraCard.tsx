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

export const EraCard = ({ era, topicId }: { era: IEra; topicId: string }) => {
  const { title, description, coverImageUrl, id } = era;

  return (
    <Card>
      <Link
        to={replaceRouteParams(ERA, {
          eraId: id,
          topicId: topicId,
        })}
      >
        <CardActionArea>
          <CardMedia
            component="img"
            height="360"
            image={coverImageUrl || "staticimagespotm2209a.jpg"}
            alt={title}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {title}
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{
                display: "-webkit-box",
                "-webkit-line-clamp": "3",
                "-webkit-box-orient": "vertical",
                overflow: "hidden",
              }}
            >
              {description}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Link>
    </Card>
  );
};
