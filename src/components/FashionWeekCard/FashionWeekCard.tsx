import { Box, Chip, Typography, useMediaQuery, useTheme } from "@mui/material";
import { IFashionWeek } from "../../interfaces/fashionWeek.interface";
import { SeasonCard } from "../SeasonCard";
import { CreateASeason } from "./CreateASeason";
import { Masonry } from "@mui/lab";
import { PlaceHolderCard } from "../PlaceHolderCard";
import { replaceRouteParams } from "../../helpers";
import { FASHION_WEEK } from "../../consts/links.const";

export const FashionWeekCard = ({
  fashionWeek,
  isFeatured = false,
  isOnDedicatedScreen = false,
}: {
  fashionWeek: IFashionWeek;
  isFeatured?: boolean;
  isOnDedicatedScreen?: boolean;
}) => {
  const { name, seasons, tags } = fashionWeek;

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box marginTop={3} marginRight={2} marginLeft={2}>
      {isOnDedicatedScreen ? null : (
        <Typography variant="h6">
          {name}
          {isFeatured ? (
            <Chip
              sx={{ marginX: 1, backgroundColor: "#f9d86b7a" }}
              label={"Featured"}
              size="small"
            />
          ) : null}
        </Typography>
      )}
      <Box display="flex" marginBottom={2}>
        {tags
          ?.sort((a, b) => a.localeCompare(b))
          .map((tag) => (
            <Chip
              key={`TAG_${tag}`}
              sx={{ marginRight: 1 }}
              label={tag}
              size="small"
            />
          ))}
      </Box>
      <Masonry columns={isMobile ? 2 : 3} spacing={2}>
        {seasons?.map((season, index) => {
          if (index > 6) return null;
          return <SeasonCard season={season} key={`SEASON_${season.$id}`} />;
        })}
        {seasons?.length > 6 && !isOnDedicatedScreen && (
          <PlaceHolderCard
            linkTo={replaceRouteParams(FASHION_WEEK, {
              fashionWeekId: fashionWeek.slug,
            })}
            text="More"
          />
        )}
      </Masonry>
      <CreateASeason fashionWeekId={fashionWeek.$id} />
    </Box>
  );
};
