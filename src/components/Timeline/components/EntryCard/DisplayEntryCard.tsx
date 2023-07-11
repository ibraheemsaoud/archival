import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import { IEntry } from "../../../../interfaces/entry.interface";

export const DisplayEntryCard = ({ entry }: { entry: IEntry }) => {
  return (
    <Card sx={{ textAlign: "start" }}>
      <CardActionArea>
        {entry?.pictureUrl && (
          <CardMedia
            component="img"
            height={100}
            width="100%"
            image={entry?.pictureUrl}
            alt={entry?.title}
          />
        )}
        <CardContent>
          <Typography
            variant="h5"
            sx={{
              display: "-webkit-box",
              "-webkit-line-clamp": "2",
              "-webkit-box-orient": "vertical",
              overflow: "hidden",
            }}
          >
            {entry.title}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              display: "-webkit-box",
              "-webkit-line-clamp": "1",
              "-webkit-box-orient": "vertical",
              overflow: "hidden",
            }}
          >
            {entry.text}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};
