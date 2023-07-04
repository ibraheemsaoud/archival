import { useLoaderData } from "react-router-dom";
import { IEntry } from "../../interfaces/entry.interface";
import { AppWrapper } from "../../components";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from "@mui/material";
import { useRequestLinkPreview } from "../../requests/external";
import { Comment } from "./Comment";
import { CreateComment } from "./CreateComment";
import { useRequestComments } from "../../requests/useRequestComments";

export const Entry = () => {
  const { entry } = useLoaderData() as any as {
    entry: IEntry;
  };
  const { data: comments, isLoading } = useRequestComments(entry?.$id);

  const { data } = useRequestLinkPreview(entry?.link);

  if (!entry) return <div>Not found</div>;
  if (isLoading) return <div>Loading...</div>;

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
            </CardContent>
          </Card>

          <Box paddingTop={4}>
            <CreateComment entryId={entry.$id} eraId={entry.eraId} />
            <Box marginTop={4}>
              {comments?.map((comment) => (
                <Comment key={comment.$id} comment={comment} />
              ))}
            </Box>
          </Box>
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
            <Typography variant="h5">Chat</Typography>
            <Typography variant="body2">coming soon...</Typography>
          </Box>
        </Grid>
      </Grid>
    </AppWrapper>
  );
};
