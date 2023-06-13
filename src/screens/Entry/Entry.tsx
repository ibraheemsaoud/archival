import { useLoaderData } from "react-router-dom";
import { IEntry } from "../../interfaces/entry.interface";
import { IComment } from "../../interfaces/comment.interface";
import { AppWrapper } from "../../components";
import { ITopic } from "../../interfaces/topic.interface";
import { IEra } from "../../interfaces/era.interface";
import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from "@mui/material";
import { useRequestLinkPreview } from "../../requests/external";
import { Comment } from "./Comment";

export const Entry = () => {
  const { topic, era, entry, comments } = useLoaderData() as any as {
    topic: ITopic;
    era: IEra;
    entry: IEntry;
    comments: IComment[];
  };

  const { data } = useRequestLinkPreview(entry?.link);

  if (!entry) return <div>Not found</div>;
  if (!comments) return <div>Loading...</div>;

  return (
    <AppWrapper>
      <Grid container spacing={4}>
        <Grid item xs={12} md={9}>
          <Card sx={{ textAlign: "start" }}>
            {data?.image && (
              <CardMedia
                component="img"
                height={300}
                image={data.image}
                alt={data?.title}
              />
            )}
            <CardContent>
              <Typography variant="body2" textAlign="end">
                {entry.timestamp.toLocaleString()}
              </Typography>
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
              <Grid>
                {comments.map((comment) => (
                  <Comment key={comment.id} comment={comment} />
                ))}
              </Grid>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Box
            sx={(theme) => ({
              border: `1px solid ${theme.palette.divider}`,
              borderRadius: 1,
              paddingX: 2,
              paddingY: 1,
              background: theme.palette.background.default,
              minHeight: 400,
            })}
          >
            chat
          </Box>
        </Grid>
      </Grid>
    </AppWrapper>
  );
};
