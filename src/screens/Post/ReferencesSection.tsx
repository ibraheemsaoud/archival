import { Box, Typography, Button, Dialog } from "@mui/material";
import { IReference } from "../../interfaces/reference.interface";
import { Reference } from "./Reference";
import { useState } from "react";
import { IPost } from "../../interfaces/post.interface";
import { ReferenceCreation } from "./RefernceCreation";
import { ReferenceDisplay } from "./ReferenceDisplay";
import { useUser } from "../../hooks";
import { ISeason } from "../../interfaces/season.interface";

export const ReferenceSection = ({
  references,
  post,
  season,
  showLogin,
}: {
  references?: IReference[];
  post?: IPost;
  season?: ISeason;
  showLogin: () => void;
}) => {
  const { user } = useUser();
  const [selectedReference, setSelectedReference] = useState<IReference>();
  const [referenceCreationOpen, setReferenceCreationOpen] = useState(false);

  const onReferenceClicked = (reference: IReference) => {
    setSelectedReference(reference);
  };

  const onReferenceCreationClicked = () => {
    if (!user) {
      showLogin();
      return;
    }
    setReferenceCreationOpen(true);
  };

  const onDone = () => {
    setReferenceCreationOpen(false);
  };

  return (
    <Box
      sx={{
        borderTop: `1px solid ${season?.secondaryColor}`,
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
        <Button
          size="small"
          variant="text"
          sx={{
            backgroundColor: "transparent",
            marginBottom: "33px",
            marginTop: "12px",
            borderRadius: "8px",
            width: "72px",
            height: "72px",
          }}
          onClick={() => onReferenceCreationClicked()}
        >
          Add
        </Button>
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
        <ReferenceDisplay
          reference={selectedReference}
          postPictureLink={post?.pictureLink}
          onDone={() => setSelectedReference(undefined)}
        />
      </Dialog>
      <Dialog
        open={referenceCreationOpen}
        onClose={onDone}
        fullWidth
        PaperProps={{
          sx: {
            backgroundColor: "#ffffff",
          },
        }}
      >
        <ReferenceCreation postId={post?.$id} seasonId={season?.$id} onDone={onDone} />
      </Dialog>
    </Box>
  );
};
