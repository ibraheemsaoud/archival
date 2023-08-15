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
  switch (reference.reference_type) {
    case "wikipedia":
      const imageProps = reference.imageLink
        ? {
            backgroundImage: `url(${reference.imageLink})`,
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
          }
        : {};
      return (
        <Box
          sx={{
            background: "#8b8e8e",
            color: "#ffffff",
            ...commonProps,
            ...imageProps,
          }}
        >
          {reference.imageLink ? undefined : "W"}
        </Box>
      );
    case "youtube":
      return <div>Youtube</div>;
    default:
      return null;
  }
};
