import { Box, Chip, Typography, useMediaQuery, useTheme } from "@mui/material";
import { IFashionWeek } from "../../interfaces/fashionWeek.interface";
import { SeasonCard } from "../SeasonCard";
import { CreateASeason } from "./CreateASeason";
import { Masonry } from "@mui/lab";

export const FashionWeekCard = ({
  fashionWeek,
}: {
  fashionWeek: IFashionWeek;
}) => {
  const { name, seasons, tags } = fashionWeek;

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box marginTop={3} marginRight={2} marginLeft={2}>
      <Typography variant="h6">{name}</Typography>
      <Box display="flex" marginBottom={2}>
        {tags?.map((tag) => (
          <Chip
            key={`TAG_${tag}`}
            sx={{ marginRight: 1 }}
            label={tag}
            size="small"
          />
        ))}
      </Box>
      <Masonry columns={isMobile ? 2 : 3} spacing={2}>
        {seasons?.map((season) =>
          season.isPublic ? (
            <SeasonCard season={season} key={`SEASON_${season.$id}`} />
          ) : null
        )}
      </Masonry>
      <CreateASeason fashionWeekId={fashionWeek.$id} />
    </Box>
  );
};
