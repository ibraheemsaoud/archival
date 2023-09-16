import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import { SEASON } from "../../consts/links.const";
import { replaceRouteParams } from "../../helpers";
import { PRIMARY_COLOR, SECONDARY_COLOR } from "../../consts/defaults.const";
import { ISeason } from "../../interfaces/season.interface";
import { IBrand } from "../../interfaces/brand.interface";

export const SeasonCard = ({
  season,
  brandView = false,
  brand,
}: {
  brand?: IBrand;
  season: ISeason;
  brandView?: boolean;
}) => {
  const name = brand?.name || season.brand?.name;

  const {
    slug,
    primaryColor = PRIMARY_COLOR,
    secondaryColor = SECONDARY_COLOR,
    coverImage,
  } = season;

  return (
    <Card
      sx={{
        backgroundColor: primaryColor,
        borderRadius: brandView ? 0 : 1,
      }}
    >
      <Link to={replaceRouteParams(SEASON, { seasonId: slug })}>
        <CardActionArea
          sx={{
            position: "relative",
          }}
        >
          <CardContent
            sx={{
              position: brandView ? "relative" : "absolute",
              bottom: 0,
              color: secondaryColor,
              background: brandView ? primaryColor : `${primaryColor}B0`,
              width: "100%",
              textAlign: brandView ? "center" : "start",
              minHeight: 280,
            }}
          >
            <Typography
              color={secondaryColor}
              sx={
                brandView
                  ? {
                      fontSize: "22px",
                      lineHeight: "21px",
                    }
                  : {}
              }
            >
              {brandView ? season.name : name}
            </Typography>
          </CardContent>
          <CardMedia
            component="img"
            image={coverImage || "\\static\\images\\potm2209a.jpg"}
          />
        </CardActionArea>
      </Link>
    </Card>
  );
};
