import { Box, Container } from "@mui/material";
import { Header } from "./Header";

interface IAppWrapper {
  children: React.ReactNode;
}
export const AppWrapper = ({ children }: IAppWrapper) => {
  return (
    <Box
      sx={{
        height: "100vh",
      }}
    >
      <Header />
      <Box paddingY={2}>
        <Container maxWidth="xl">{children}</Container>
      </Box>
    </Box>
  );
};
