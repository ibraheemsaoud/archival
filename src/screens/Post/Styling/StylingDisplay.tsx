import { Box, Button, Link, Typography } from "@mui/material";
import { useUser } from "../../../hooks";
import { useRequestDeleteReference } from "../../../requests/useRequestReference";
import { useEffect } from "react";
import { requestDeleteFile } from "../../../requests/requestUploadFile";
import { IStyling } from "../../../interfaces/styling.interface";

export const StylingDisplay = ({
  styling,
  postPictureLink,
  onDone,
}: {
  styling?: IStyling;
  postPictureLink?: string;
  onDone(): void;
}) => {
  const { user } = useUser();
  const { mutate: deleteReference, isSuccess } = useRequestDeleteReference();
  const referenceImageLink = styling?.imageUrl;

  useEffect(() => {
    if (isSuccess) {
      if (referenceImageLink?.startsWith("https://cloud.appwrite.io/")) {
        requestDeleteFile(referenceImageLink);
        onDone();
      } else {
        onDone();
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess]);

  if (!styling) return null;

  const removeHTTPWWW = (link: string) => {
    return link.replace(/^(?:https?:\/\/)?(?:www\.)?/i, "");
  };

  const onDelete = () => {
    deleteReference(styling.$id);
  };

  return (
    <Box>
      <Box display="flex">
        {postPictureLink ? (
          <Box
            sx={{
              backgroundImage: `url(${postPictureLink})`,
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
              flexGrow: 1,
              height: "400px",
              backgroundPositionX: "center",
              backgroundPositionY: "top",
            }}
          />
        ) : null}
        <Box
          sx={{
            backgroundImage: `url(${styling.imageUrl})`,
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            flexGrow: 1,
            height: "400px",
            backgroundPositionX: "center",
            backgroundPositionY: "top",
          }}
        />
      </Box>
      <Box marginX={2} marginBottom={4}>
        <Link href={styling.imageUrl}>
          <Typography
            variant="body1"
            component="div"
            sx={{
              overflow: "hidden",
              breakAfter: "auto",
              textOverflow: "ellipsis",
            }}
          >
            {removeHTTPWWW(styling.imageUrl)}
          </Typography>
        </Link>
        {/* <Typography variant="h4" component="div" marginTop={3}>
          {reference.referenceTitle}
        </Typography> */}
        <Typography variant="body1" component="div">
          {styling.description}
        </Typography>
        <Box sx={{ textAlign: "right" }}>
          {user?.$id === styling.userId && (
            <Button color="red" size="small" onClick={onDelete}>
              delete
            </Button>
          )}
        </Box>
      </Box>
    </Box>
  );
};
