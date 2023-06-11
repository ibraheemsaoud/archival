import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import { IEntry } from "../../interfaces/entry.interface";
import { useRequestLinkPreview } from "../../requests/external";
import {
  ThumbUpOutlined,
  MessageOutlined,
  ShareOutlined,
  QuestionAnswerOutlined,
} from "@mui/icons-material";

export const EntryCard = ({ entry }: { entry: IEntry }) => {
  const { data } = useRequestLinkPreview(entry.link);

  switch (entry.variant) {
    case "link":
      return (
        <Card>
          {/* <Link to={entry.link}> */}
          <CardActionArea>
            {data?.image && (
              <CardMedia
                component="img"
                height={entry.interaction.height || 140}
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
            <CardContent>
              <Box display="flex" justifyContent="center">
                <Typography
                  variant="body2"
                  marginRight={2}
                  display="flex"
                  alignItems="center"
                >
                  <ThumbUpOutlined />
                  {entry.interaction.likes} Likes
                </Typography>
                <Typography
                  variant="body2"
                  marginRight={2}
                  display="flex"
                  alignItems="center"
                >
                  <MessageOutlined />
                  {entry.interaction.comments} Comments
                </Typography>

                <Typography
                  variant="body2"
                  marginRight={2}
                  display="flex"
                  alignItems="center"
                >
                  <ShareOutlined />
                  {entry.interaction.shares} Shares
                </Typography>

                <Typography variant="body2" display="flex" alignItems="center">
                  <QuestionAnswerOutlined />
                  {entry.interaction.reactions} Reactions
                </Typography>
              </Box>
            </CardContent>
          </CardActionArea>
          {/* </Link> */}
        </Card>
      );
    case "image":
      break;
    case "text":
      break;
  }
  // backup preview link: https://github.com/dhaiwat10/react-link-preview
  // https://my.linkpreview.net/access_keys

  return <Box></Box>;
};
