import {
  AppBar,
  Box,
  Button,
  Container,
  ThemeProvider,
  Toolbar,
  Typography,
} from "@mui/material";
import { useLoaderData } from "react-router-dom";
import { ISeason } from "../../interfaces/season.interface";
import { theme } from "../../theme";
import { IBrand } from "../../interfaces/brand.interface";
import { IPost } from "../../interfaces/post.interface";
import { PostCard } from "../../components";

export const Season = () => {
  const { season, posts, brand } = useLoaderData() as any as {
    brand?: IBrand;
    season?: ISeason;
    posts?: IPost[];
  };

  if (!season || !brand) return <div>Loading...</div>;

  const modedTheme = theme("light", season.primaryColor);

  return (
    <ThemeProvider theme={modedTheme}>
      <Container maxWidth="sm" disableGutters>
        <Box sx={{ flexGrow: 1 }}>
          <AppBar position="static">
            <Toolbar sx={{ alignItems: "flex-end" }}>
              <Button
                size="small"
                variant="outlined"
                sx={{ marginBottom: 1 }}
                onClick={() => {}}
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
                  {season.name}
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
        <Box sx={{ flexGrow: 1 }}>
          {posts && posts.map((post) => <PostCard post={post} />)}
        </Box>
      </Container>
    </ThemeProvider>
  );
};
