import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import { IEntry } from "../../../../interfaces/entry.interface";
import { useRequestLinkPreview } from "../../../../requests/external";

export const EntryCard = ({ entry }: { entry: IEntry }) => {
  const { data } = useRequestLinkPreview(entry?.link);

  return (
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
  );
  // backup preview link: https://github.com/dhaiwat10/react-link-preview
  // https://my.linkpreview.net/access_keys
};
