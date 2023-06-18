import { Box, Container } from "@mui/material";
import { Header } from "./Header";
import { useFirebase, useRoles } from "../../hooks";
import { useMemo } from "react";
import { ProfileSetup } from "./ProfileSetup";

interface IAppWrapper {
  children: React.ReactNode;
}
export const AppWrapper = ({ children }: IAppWrapper) => {
  const { user } = useFirebase();
  const { extendedUser } = useRoles();

  const profileNeedsSetup = useMemo(() => {
    return user && !extendedUser;
  }, [user, extendedUser]);

  return (
    <Box
      sx={{
        height: "100vh",
      }}
    >
      <Header />
      <Box paddingY={2}>
        {profileNeedsSetup && <ProfileSetup />}
        <Container maxWidth="xl">{children}</Container>
      </Box>
    </Box>
  );
};
