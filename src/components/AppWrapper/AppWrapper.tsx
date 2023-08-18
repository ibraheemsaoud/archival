import { Box, Container } from "@mui/material";
import { Navigation } from "./Navigation";
import { PRIMARY_COLOR } from "../../consts/defaults.const";

interface IAppWrapper {
  children: React.ReactNode;
  primaryColor?: string;
}
export const AppWrapper = ({ children, primaryColor= PRIMARY_COLOR }: IAppWrapper) => {
  return (
    <Container
      maxWidth="sm"
      disableGutters
      sx={{
        height: "100vh",
        backgroundColor: `${primaryColor}5e`,
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
