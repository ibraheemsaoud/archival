import { Card, CardActionArea, CardContent, CardMedia } from "@mui/material";
import { Link } from "react-router-dom";
import { SEASON } from "../../consts/links.const";
import { replaceRouteParams } from "../../helpers";
import { useRequestSeason } from "../../requests/useRequestSeason";
import { PRIMARY_COLOR, SECONDARY_COLOR } from "../../consts/defaults.const";

export const SeasonCard = ({ seasonId }: { seasonId: string }) => {
  const { data: season, isLoading, error } = useRequestSeason(seasonId);
  if (error) return <>{error}</>;
  if (isLoading) return <div>Loading...</div>;
  if (!season) return <div>Season not found</div>;

  const {
    slug,
    primaryColor = PRIMARY_COLOR,
    secondaryColor = SECONDARY_COLOR,
    coverImage,
    name,
  } = season;

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
              background: `${primaryColor}80`,
              width: "100%",
            }}
          >
            <div>{name}</div>
          </CardContent>
        </CardActionArea>
      </Link>
    </Card>
  );
};
