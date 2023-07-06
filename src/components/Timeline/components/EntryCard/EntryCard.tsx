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
            <Typography variant="h5">{entry.title}</Typography>
            {entry?.text && (
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{
                  textOverflow: "ellipsis",
                  overflow: "hidden",
                  whiteSpace: "nowrap",
                }}
              >
                {entry?.text}
              </Typography>
            )}
            <Typography variant="body2" color="text.secondary">
              {entry.text}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Link>
  );
};
