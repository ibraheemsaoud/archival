import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import { PRIMARY_COLOR, SECONDARY_COLOR } from "../../consts/defaults.const";

export const PlaceHolderCard = ({
  text,
  linkTo,
}: {
  text?: string;
  linkTo: string;
}) => {
  const primaryColor = PRIMARY_COLOR,
    secondaryColor = SECONDARY_COLOR;

  return (
    <Link to={linkTo}>
      <Card
        sx={{
          backgroundColor: primaryColor,
          borderRadius: 1,
        }}
      >
        <CardActionArea
          sx={{
            position: "relative",
          }}
        >
          <CardContent
            sx={{
              position: "absolute",
              bottom: 0,
              color: secondaryColor,
              background: `${primaryColor}B0`,
              width: "100%",
              textAlign: "center",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              height: 260,
              fontWeight: 600,
            }}
          >
            <Typography color={secondaryColor}>
              {text || "No data available"}
            </Typography>
          </CardContent>
          <CardMedia
            component="img"
            image={"\\static\\images\\placeholder.jpeg"}
            sx={{ height: 260 }}
          />
        </CardActionArea>
      </Card>
    </Link>
  );
};
