import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import { IEra } from "../../interfaces/era.interface";
import { Link } from "react-router-dom";

export const EraCard = ({ era }: { era: IEra }) => {
  const { title, description } = era;
  return (
    <Card sx={{ maxWidth: 345 }}>
      <Link to={`/era/${era.id}`}>
        <CardActionArea>
          <CardMedia
            component="img"
            height="140"
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
