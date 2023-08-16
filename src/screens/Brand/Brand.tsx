import {
  AppBar,
  Box,
  Button,
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

  return (
    <ThemeProvider theme={modedTheme}>
      <AppWrapper>
        <Box sx={{ flexGrow: 1 }}>
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
                sx={{ marginBottom: 1 }}
                onClick={() => {}}
              >
                Chat
              </Button>
            </Toolbar>
          </AppBar>
        </Box>
        <Box>
          {seasons.map((season: ISeason) => (
            <SeasonCard key={season.$id} seasonId={season.slug} />
          ))}
        </Box>
      </AppWrapper>
    </ThemeProvider>
  );
};
