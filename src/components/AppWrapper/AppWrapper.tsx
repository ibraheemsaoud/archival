import { Box, Container } from "@mui/material";
import { Navigation } from "./Navigation";

interface IAppWrapper {
  children: React.ReactNode;
}
export const AppWrapper = ({ children }: IAppWrapper) => {
  return (
    <Container
      maxWidth="sm"
      disableGutters
      sx={{
        height: "100vh",
        backgroundColor: "#ffffff",
        // border: "1px solid #e0e0e0",
        // boxSizing: "content-box",
      }}
    >
      <Box
        sx={{
          height: "calc(100vh - 56px)",
          overflowY: "auto",
          paddingBottom: 2,
        }}
      >
        {children}
      </Box>
      <Navigation />
    </Container>
  );
};
