import { Box, Container } from "@mui/material";
import { Header } from "./Header";

interface IAppWrapper {
  children: React.ReactNode;
}
export const AppWrapper = ({ children }: IAppWrapper) => {
  return (
    <Container maxWidth="sm" disableGutters>
      <Box
        sx={{
          height: "100vh",
          backgroundColor: "#ffffff",
          border: "1px solid #e0e0e0",
        }}
      >
        <Header />
        {children}
      </Box>
    </Container>
  );
};
