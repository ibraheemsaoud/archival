import { Box } from "@mui/material";
import { IReference } from "../../interfaces/reference.interface";

export const Reference = ({ reference }: { reference: IReference }) => {
  switch (reference.reference_type) {
    case "wikipedia":
      return <Box>W</Box>;
    case "youtube":
      return <div>Youtube</div>;
    default:
      return null;
  }
};
