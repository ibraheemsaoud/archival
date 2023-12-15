import { Box, Typography, Button, Dialog } from "@mui/material";
import { IStyling } from "../../../interfaces/styling.interface";
import { Styling } from "./Styling";
import { useState } from "react";
import { IPost } from "../../../interfaces/post.interface";
import { StylingCreation } from "./StylingCreation";
import { useUser } from "../../../hooks";
import { ISeason } from "../../../interfaces/season.interface";
import { replaceRouteParams } from "../../../helpers";
import { Link } from "react-router-dom";
import { STYLING } from "../../../consts/links.const";

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
  const [StylingCreationOpen, setStylingCreationOpen] = useState(false);

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
            <Link
              to={replaceRouteParams(STYLING, { stylingId: styling.$id })}
              key={styling.$id}
            >
              <Styling styling={styling} />
            </Link>
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
          onDone={onDone}
        />
      </Dialog>
    </Box>
  );
};
