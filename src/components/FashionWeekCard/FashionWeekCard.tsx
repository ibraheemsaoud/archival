import { Box, Chip, Grid, Typography } from "@mui/material";
import { IFashionWeek } from "../../interfaces/fashionWeek.interface";
import { SeasonCard } from "../SeasonCard";

export const FashionWeekCard = ({
  fashionWeek,
}: {
  fashionWeek: IFashionWeek;
}) => {
  const { name, seasonIds, tags } = fashionWeek;
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
      <Grid container spacing={1}>
        {seasonIds?.map((seasonId) => (
          <Grid item xs={6} lg={4} key={`SEASON_${seasonId}`}>
            <SeasonCard seasonId={seasonId} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};