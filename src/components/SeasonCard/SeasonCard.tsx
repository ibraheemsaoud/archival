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
import { useRequestSeason } from "../../requests/useRequestSeason";
import { PRIMARY_COLOR, SECONDARY_COLOR } from "../../consts/defaults.const";
import { useRequestBrand } from "../../requests/useRequestBrand";

export const SeasonCard = ({
  seasonId,
  brandView = false,
}: {
  seasonId: string;
  brandView?: boolean;
}) => {
  const { data: season, isLoading, error } = useRequestSeason(seasonId);
  const { data: brand, isLoading: isBrandLoading } = useRequestBrand(
    season?.brandId
  );

  if (error) return <div>{error?.toString()}</div>;
  if (isLoading || isBrandLoading) return <div>Loading...</div>;
  if (!season || !brand) return <div>Season not found</div>;

  const {
    slug,
    primaryColor = PRIMARY_COLOR,
    secondaryColor = SECONDARY_COLOR,
    coverImage,
  } = season;

  const { name } = brand;

  return (
    <Card
      sx={{
        backgroundColor: primaryColor,
        borderRadius: 1,
      }}
    >
      <Link to={replaceRouteParams(SEASON, { seasonId: slug })}>
        <CardActionArea
          sx={{
            position: "relative",
          }}
        >
          <CardMedia
            component="img"
            image={coverImage || "\\static\\images\\potm2209a.jpg"}
          />
          <CardContent
            sx={{
              position: "absolute",
              bottom: 0,
              color: secondaryColor,
              background: `${primaryColor}B0`,
              width: "100%",
            }}
          >
            <Typography fontWeight="bold" color={secondaryColor}>
              {brandView ? season.name : name}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Link>
    </Card>
  );
};
