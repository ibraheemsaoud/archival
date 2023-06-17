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
import { useRequestLinkPreview } from "../../../../requests/external";
import { replaceRouteParams } from "../../../../helpers";
import { ENTRY } from "../../../../consts/links.const";
import { IEra } from "../../../../interfaces/era.interface";
import { ITopic } from "../../../../interfaces/topic.interface";

export const EntryCard = ({ entry }: { entry: IEntry }) => {
  const { era, topic } = useLoaderData() as any as {
    era: IEra;
    topic: ITopic;
  };
  const { data } = useRequestLinkPreview(entry?.link);

  return (
    <Link
      component={NavLink}
      underline="none"
      to={replaceRouteParams(ENTRY, {
        eraId: era.id,
        topicId: topic.id,
        entryId: entry.id,
      })}
    >
      <Card sx={{ textAlign: "start" }}>
        <CardActionArea>
          {data?.image && (
            <CardMedia
              component="img"
              height={175}
              image={data.image}
              alt={data?.title}
            />
          )}
          <CardContent>
            <Typography variant="h5">{entry.title}</Typography>
            {data?.description && (
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{
                  textOverflow: "ellipsis",
                  overflow: "hidden",
                  whiteSpace: "nowrap",
                }}
              >
                {data.description}
              </Typography>
            )}
          </CardContent>
        </CardActionArea>
      </Card>
    </Link>
  );
  // backup preview link: https://github.com/dhaiwat10/react-link-preview
  // https://my.linkpreview.net/access_keys
};
