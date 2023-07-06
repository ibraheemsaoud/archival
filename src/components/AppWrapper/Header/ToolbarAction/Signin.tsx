import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { useSignin } from "./useSignin";
import { useState } from "react";

export const Signin = () => {
  const {
    handleSignInWithGoogle,
    handleSignUpWithEmail,
    handleSignInWithEmail,
    handleNameChange,
    handleEmailChange,
    handlePasswordChange,
    handleLoginEmailChange,
    handleLoginPasswordChange,
    name,
    email,
    password,
    loginEmail,
    loginPassword,
  } = useSignin();

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const isMobile = window.innerWidth < 600;
  return (
    <>
      <Dialog onClose={handleClose} open={open} maxWidth="xs">
        <Box sx={{ paddingX: 2, paddingY: 4 }}>
          <Grid container>
            <Grid item xs={12} sx={{ minWidth: 300, marginBottom: 4 }}>
              <DialogTitle variant="h5" textAlign="center">
                Sing up
              </DialogTitle>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <TextField
                  id="name"
                  label="Username"
                  variant="outlined"
                  fullWidth
                  size="small"
                  value={name}
                  onChange={handleNameChange}
                  sx={{ marginBottom: 1 }}
                />
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
                  onClick={handleSignUpWithEmail}
                >
                  Sign up with email
                </Button>
              </Box>
            </Grid>
            <Grid item xs={12} sx={{ minWidth: 300 }}>
              <DialogTitle variant="h5" textAlign="center">
                Sign in
              </DialogTitle>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <TextField
                  id="email"
                  label="Email"
                  variant="outlined"
                  fullWidth
                  size="small"
                  value={loginEmail}
                  onChange={handleLoginEmailChange}
                  sx={{ marginBottom: 1 }}
                />
                <TextField
                  id="password"
                  label="Password"
                  variant="outlined"
                  fullWidth
                  size="small"
                  value={loginPassword}
                  onChange={handleLoginPasswordChange}
                  sx={{ marginBottom: 1 }}
                  type="password"
                />
                <Button
                  variant="contained"
                  fullWidth
                  onClick={handleSignInWithEmail}
                >
                  Sign in with email
                </Button>
              </Box>
            </Grid>
          </Grid>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography variant="body1" sx={{ marginY: 1 }}>
              OR
            </Typography>
            <Button variant="contained" onClick={handleSignInWithGoogle}>
              Continue With Google
            </Button>
          </Box>
        </Box>
      </Dialog>
      <Button onClick={handleClickOpen} variant="contained">
        {isMobile ? "Login" : "Login / Register"}
      </Button>
    </>
  );
};
