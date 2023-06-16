import { Box, Button, TextField } from "@mui/material";
import { useSignin } from "./useSignin";

export const Signin = () => {
  const { handleEmailChange, handleSignInWithEmail, signInWithGoogle, email } =
    useSignin();

  return (
    <div>
      <Box
        component="form"
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          "& > :not(style)": { m: 1, width: "25ch" },
          paddingX: 2,
          paddingBottom: 3,
        }}
        noValidate
        autoComplete="off"
      >
        <Box
          sx={(theme) => ({
            paddingX: 2,
            paddingY: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            border: `1px solid ${theme.palette.divider}`,
            borderRadius: 1,
          })}
        >
          <TextField
            id="email"
            label="Email"
            variant="outlined"
            fullWidth
            size="small"
            value={email}
            onChange={handleEmailChange}
            sx={{ marginBottom: 1 }}
          />
          <Button variant="contained" fullWidth onClick={handleSignInWithEmail}>
            Sign In With Email
          </Button>
        </Box>
        OR
        <Button variant="contained" onClick={signInWithGoogle} fullWidth>
          Sign In With Google
        </Button>
      </Box>
    </div>
  );
};
