import {
  AppBar,
  Box,
  Button,
  Grid,
  ThemeProvider,
  Toolbar,
  Typography,
} from "@mui/material";
import { useLoaderData } from "react-router-dom";
import { ISeason } from "../../interfaces/season.interface";
import { theme } from "../../theme";
import { IBrand } from "../../interfaces/brand.interface";
import { AppWrapper, SeasonCard } from "../../components";
import { useNavigation } from "../../hooks";
import { HOME } from "../../consts/links.const";

export const Brand = () => {
  const { onBack } = useNavigation();
  const { seasons, brand } = useLoaderData() as any as {
    brand?: IBrand;
    seasons?: ISeason[];
  };

  if (!seasons || !brand) return <div>Loading...</div>;

  const modedTheme = theme("light", brand.primaryColor, brand.secondaryColor);
  const lastSeason = seasons[0];
  const restOfSeasons = seasons.slice(1);

  return (
    <ThemeProvider theme={modedTheme}>
      <AppWrapper>
        <Box sx={{ position: "sticky", top: -60, zIndex: 2 }}>
          <AppBar position="static">
            <Toolbar sx={{ alignItems: "flex-end" }}>
              <Button
                size="small"
                variant="outlined"
                sx={{ marginBottom: 1 }}
                onClick={() => onBack(HOME)}
              >
                Back
              </Button>
              <Box sx={{ margin: 1, textAlign: "center", flexGrow: 1 }}>
                <Box
                  sx={{
                    backgroundImage: `url(${brand.logoLink})`,
                    backgroundSize: "contain",
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "center",
                    width: "100%",
                    maxHeight: "60px",
                    minHeight: "60px",
                  }}
                />
                <Typography variant="h6" component="div">
                  {brand.name}
                </Typography>
              </Box>
              <Button
                size="small"
                variant="outlined"
                sx={{ marginBottom: 1, visibility: "hidden" }}
                onClick={() => {}}
              >
                Chat
              </Button>
            </Toolbar>
          </AppBar>
        </Box>
        {lastSeason && <SeasonCard seasonId={lastSeason.slug} brandView />}
        {restOfSeasons.length > 0 && (
          <Box marginX={1} marginY={2}>
            <Typography
              variant="h6"
              component="div"
              sx={{ textDecoration: "underline" }}
            >
              Seasons
            </Typography>
            <Grid container spacing={1}>
              {restOfSeasons.map((season: ISeason) => (
                <Grid item xs={6} lg={4} key={season.$id}>
                  <SeasonCard seasonId={season.slug} brandView />
                </Grid>
              ))}
            </Grid>
          </Box>
        )}
      </AppWrapper>
    </ThemeProvider>
  );
};
