import { Box, Button } from "@mui/material";
import { IStyling } from "../../../interfaces/styling.interface";

export const Styling = ({
  styling,
  onStylingClicked,
}: {
  styling: IStyling;
  onStylingClicked: (styling: IStyling) => void;
}) => {
  const commonProps: any = {
    width: "75px",
    height: "100px",
    borderRadius: 2,
    // margin: 1,
    overflow: "hidden",
  };
  const imageProps = styling.imageUrl
    ? {
        backgroundImage: `url(${styling.imageUrl})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }
    : {};

  return (
    <Button
      size="small"
      variant="text"
      sx={{
        backgroundColor: "transparent",
        minWidth: 108,
        maxWidth: 108,
        maxHeight: 144,
        minHeight: 144,
        marginTop: '12px',
        marginBottom: '33px',
      }}
      onClick={() => onStylingClicked(styling)}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            background: "#8b8e8e",
            color: "#ffffff",
            ...commonProps,
            ...imageProps,
          }}
        />
        {styling.description}
      </Box>
    </Button>
  );
};
