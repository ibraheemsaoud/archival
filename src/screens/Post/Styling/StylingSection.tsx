import { Box, Typography, Button, Dialog } from "@mui/material";
import { IStyling } from "../../../interfaces/styling.interface";
import { Styling } from "./Styling";
import { useState } from "react";
import { IPost } from "../../../interfaces/post.interface";
import { StylingCreation } from "./StylingCreation";
import { StylingDisplay } from "./StylingDisplay";
import { useUser } from "../../../hooks";
import { ISeason } from "../../../interfaces/season.interface";

export const StylingSection = ({
  stylings,
  post,
  season,
  showLogin,
}: {
  stylings?: IStyling[];
  post?: IPost;
  season?: ISeason;
  showLogin: () => void;
}) => {
  const { user } = useUser();
  const [selectedStyling, setSelectedStyling] = useState<IStyling>();
  const [StylingCreationOpen, setStylingCreationOpen] = useState(false);

  const onStylingClicked = (Styling: IStyling) => {
    setSelectedStyling(Styling);
  };

  const onStylingCreationClicked = () => {
    if (!user) {
      showLogin();
      return;
    }
    setStylingCreationOpen(true);
  };

  const onDone = () => {
    setStylingCreationOpen(false);
  };

  return (
    <Box
      sx={{
        borderTop: `1px solid ${season?.primaryColor}`,
      }}
    >
      <Typography
        variant="h6"
        component="div"
        marginX={1}
        sx={{ textDecoration: "underline" }}
      >
        Stylings
      </Typography>
      <Box
        sx={{
          display: "flex",
          overflow: "auto",
          marginX: 1,
        }}
      >
        {stylings?.map((styling: IStyling) => {
          return (
            <Styling
              styling={styling}
              key={styling.$id}
              onStylingClicked={onStylingClicked}
            />
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
            width: "108px",
            height: "144px",
          }}
          onClick={() => onStylingCreationClicked()}
        >
          Add
        </Button>
      </Box>
      <Dialog
        open={!!selectedStyling}
        onClose={() => setSelectedStyling(undefined)}
        fullWidth
        PaperProps={{
          sx: {
            backgroundColor: "#ffffff",
          },
        }}
      >
        <StylingDisplay
          styling={selectedStyling}
          postPictureLink={post?.pictureLink}
          onDone={() => setSelectedStyling(undefined)}
        />
      </Dialog>
      <Dialog
        open={StylingCreationOpen}
        onClose={onDone}
        fullWidth
        PaperProps={{
          sx: {
            backgroundColor: "#ffffff",
          },
        }}
      >
        <StylingCreation
          postId={post?.$id}
          seasonId={season?.$id}
          onDone={onDone}
        />
      </Dialog>
    </Box>
  );
};
