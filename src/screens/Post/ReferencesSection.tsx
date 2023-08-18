import { Box, Typography, Button, Dialog, Link } from "@mui/material";
import { IReference } from "../../interfaces/reference.interface";
import { Reference } from "./Reference";
import { useState } from "react";
import { IPost } from "../../interfaces/post.interface";

export const ReferenceSection = ({
  references,
  post,
}: {
  references?: IReference[];
  post: IPost;
}) => {
  const [selectedReference, setSelectedReference] = useState<IReference>();

  if (references?.length === 0) return null;

  const onReferenceClicked = (reference: IReference) => {
    setSelectedReference(reference);
  };

  const removeHTTPWWW = (link: string) => {
    return link.replace(/^(?:https?:\/\/)?(?:www\.)?/i, "");
  };

  return (
    <Box
      sx={{
        borderTop: "1px solid #d6d6d6",
      }}
    >
      <Typography
        variant="h6"
        component="div"
        marginX={1}
        sx={{ textDecoration: "underline" }}
      >
        References
      </Typography>
      <Box
        sx={{
          display: "flex",
          overflow: "auto",
          marginX: 1,
        }}
      >
        {references?.map((reference: IReference) => {
          return (
            <Button
              key={reference.$id}
              size="small"
              variant="text"
              sx={{ backgroundColor: "transparent" }}
              onClick={() => onReferenceClicked(reference)}
            >
              <Reference reference={reference} />
            </Button>
          );
        })}
      </Box>
      <Dialog
        open={!!selectedReference}
        onClose={() => setSelectedReference(undefined)}
        fullWidth
        PaperProps={{
          sx: {
            backgroundColor: "#ffffff",
          },
        }}
      >
        {selectedReference && (
          <Box>
            <Box display="flex">
              <Box
                sx={{
                  backgroundImage: `url(${post.pictureLink})`,
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
                  backgroundImage: `url(${selectedReference.imageLink})`,
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
              <Link href={selectedReference.imageLink}>
                <Typography
                  variant="body1"
                  component="div"
                  sx={{
                    overflow: "hidden",
                    breakAfter: "auto",
                    textOverflow: "ellipsis",
                  }}
                >
                  {removeHTTPWWW(selectedReference.imageLink)}
                </Typography>
              </Link>
              <Typography variant="h4" component="div" marginTop={3}>
                {selectedReference.referenceTitle}
              </Typography>
              <Typography variant="body1" component="div">
                {selectedReference.referenceDescription}
              </Typography>
            </Box>
          </Box>
        )}
      </Dialog>
    </Box>
  );
};
