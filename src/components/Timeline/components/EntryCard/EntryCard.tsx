import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Link,
  Typography,
} from "@mui/material";
import { Link as NavLink, useLoaderData } from "react-router-dom";
import { IEntry } from "../../../../interfaces/entry.interface";
import { replaceRouteParams } from "../../../../helpers";
import { ENTRY } from "../../../../consts/links.const";
import { IEra } from "../../../../interfaces/era.interface";
import { ITopic } from "../../../../interfaces/topic.interface";

export const EntryCard = ({ entry }: { entry: IEntry }) => {
  const { era, topic } = useLoaderData() as any as {
    era: IEra;
    topic: ITopic;
  };

  return (
    <Link
      component={NavLink}
      underline="none"
      to={replaceRouteParams(ENTRY, {
        eraId: era.id,
        topicId: topic.id,
        entryId: entry.$id,
      })}
    >
      <Card sx={{ textAlign: "start" }}>
        <CardActionArea>
          {entry?.pictureUrl && (
            <CardMedia
              component="img"
              height={175}
              image={entry?.pictureUrl}
              alt={entry?.title}
            />
          )}
          <CardContent>
            <Typography textAlign="end" variant="body2" color="text.secondary">
              {entry.timestamp?.toLocaleDateString()}
            </Typography>
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
                "-webkit-line-clamp": "3",
                "-webkit-box-orient": "vertical",
                overflow: "hidden",
              }}
            >
              {entry.text}
            </Typography>
            <Link href={entry.link} target="_blank">
              <Typography
                variant="body2"
                color="text.secondary"
                marginTop={2}
                sx={{
                  display: "-webkit-box",
                  "-webkit-line-clamp": "1",
                  "-webkit-box-orient": "vertical",
                  overflow: "hidden",
                }}
              >
                {entry.link}
              </Typography>
            </Link>
          </CardContent>
        </CardActionArea>
      </Card>
    </Link>
  );
};
