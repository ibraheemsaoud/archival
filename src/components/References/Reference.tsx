import { Box } from "@mui/material";
import { IReference } from "../../interfaces/reference.interface";

export const Reference = ({ reference }: { reference: IReference }) => {
  const commonProps: any = {
    width: "72px",
    height: "72px",
    borderRadius: 2,
    textAlign: "center",
    lineHeight: "72px",
    fontSize: "28px",
    fontWeight: "bold",
    margin: 1,
    overflow: "hidden",
  };
  const imageProps = reference.imageLink
    ? {
        backgroundImage: `url(${reference.imageLink})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }
    : {};

  let title = "";
  switch (reference.reference_type) {
    case "wikipedia":
      title = "Wikipedia";
      break;
    case "youtube":
      title = "Youtube";
      break;
    default:
      title = reference.reference_link;
      break;
  }

  return (
    <Box
      sx={{
        maxWidth: 80,
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
      {title}
    </Box>
  );
};
