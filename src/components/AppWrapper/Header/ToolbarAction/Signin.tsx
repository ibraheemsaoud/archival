import { Box, Button, Dialog, DialogTitle, TextField } from "@mui/material";
import { useSignin } from "./useSignin";
import { useState } from "react";

export const Signin = () => {
  const {
    handleEmailChange,
    handleSignInWithEmail,
    handlePasswordChange,
    handleSignInWithGoogle,
    email,
    password,
  } = useSignin();

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
      <Dialog onClose={handleClose} open={open}>
        <DialogTitle variant="h5">Sign in</DialogTitle>
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
              <TextField
                id="password"
                label="Password"
                variant="outlined"
                fullWidth
                size="small"
                value={password}
                onChange={handlePasswordChange}
                sx={{ marginBottom: 1 }}
                type="password"
              />
              <Button
                variant="contained"
                fullWidth
                onClick={handleSignInWithEmail}
              >
                Sign In With Email
              </Button>
              OR
              <Button
                variant="contained"
                fullWidth
                onClick={handleSignInWithGoogle}
              >
                Sign In With Google
              </Button>
            </Box>
          </Box>
        </div>
      </Dialog>
      <Button onClick={handleClickOpen} variant="contained">
        Login
      </Button>
    </>
  );
};
