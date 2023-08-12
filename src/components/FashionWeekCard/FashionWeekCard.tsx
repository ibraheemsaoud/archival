import { Box, Chip, Typography } from "@mui/material";
import { IFashionWeek } from "../../interfaces/fashionWeek.interface";

export const FashionWeekCard = ({
  fashionWeek,
}: {
  fashionWeek: IFashionWeek;
}) => {
  const { name, seasonIds, tags } = fashionWeek;
  return (
    <Box marginTop={3} marginRight={1} marginLeft={1}>
      <Typography variant="h6">{name}</Typography>
      <Box display="flex">
        {tags?.map((tag) => (
          <Chip key={`TAG_${tag}`} sx={{ marginRight: 1 }} label={tag} />
        ))}
      </Box>
      <Box display="flex" marginTop={2}>
        {seasonIds?.map((seasonId) => (
          <Chip
            key={`SEASON_${seasonId}`}
            sx={{ marginRight: 1 }}
            label={seasonId}
          />
        ))}
      </Box>
    </Box>
  );
};
