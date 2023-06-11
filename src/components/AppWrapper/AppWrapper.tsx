import { Box } from "@mui/material";
import { Header, IHeader } from "./Header";

interface IAppWrapper {
  children: React.ReactNode;
  headerProps: IHeader;
}
export const AppWrapper = ({ children, headerProps }: IAppWrapper) => {
  return (
    <Box
      sx={{
        height: "100vh",
      }}
    >
      <Header {...headerProps} />
      <Box paddingX={4} paddingY={2}>
        {children}
      </Box>
    </Box>
  );
};
