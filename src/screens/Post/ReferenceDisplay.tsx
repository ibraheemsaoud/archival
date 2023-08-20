import { Box, Button, Link, Typography } from "@mui/material";
import { IReference } from "../../interfaces/reference.interface";
import { useUser } from "../../hooks";
import { useRequestDeleteReference } from "../../requests/useRequestReference";
import { useEffect } from "react";
import { requestDeleteFile } from "../../requests/requestUploadFile";

export const ReferenceDisplay = ({
  reference,
  postPictureLink,
  onDone,
}: {
  reference?: IReference;
  postPictureLink: string;
  onDone(): void;
}) => {
  const { user } = useUser();
  const { mutate: deleteReference, isSuccess } = useRequestDeleteReference();
  const referenceImageLink = reference?.imageLink;

  useEffect(() => {
    if (isSuccess) {
      if (referenceImageLink?.startsWith("https://cloud.appwrite.io/")) {
        requestDeleteFile(referenceImageLink);
        onDone();
      } else {
        onDone();
      }
    }
  }, [isSuccess]);

  if (!reference) return null;

  const removeHTTPWWW = (link: string) => {
    return link.replace(/^(?:https?:\/\/)?(?:www\.)?/i, "");
  };

  const onDelete = () => {
    deleteReference(reference.$id);
  };

  return (
    <Box>
      <Box display="flex">
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
        <Box
          sx={{
            backgroundImage: `url(${reference.imageLink})`,
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
        <Link href={reference.imageLink}>
          <Typography
            variant="body1"
            component="div"
            sx={{
              overflow: "hidden",
              breakAfter: "auto",
              textOverflow: "ellipsis",
            }}
          >
            {removeHTTPWWW(reference.imageLink)}
          </Typography>
        </Link>
        <Typography variant="h4" component="div" marginTop={3}>
          {reference.referenceTitle}
        </Typography>
        <Typography variant="body1" component="div">
          {reference.referenceDescription}
        </Typography>
        <Box sx={{ textAlign: "right" }}>
          {user?.$id === reference.userId && (
            <Button color="red" size="small" onClick={onDelete}>
              delete
            </Button>
          )}
        </Box>
      </Box>
    </Box>
  );
};
