import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Dialog,
  Link,
  TextField,
  Typography,
} from "@mui/material";
import { Link as NavLink } from "react-router-dom";
import { useSignin } from "./useSignin";
import { useEffect, useState } from "react";
import { TERMS } from "../../../../consts/links.const";
import { ExpandMoreSharp } from "@mui/icons-material";

export const Signin = ({ shouldLogin = false }: { shouldLogin?: boolean }) => {
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

  const [open, setOpen] = useState(shouldLogin);

  useEffect(() => {
    setOpen(shouldLogin);
  }, [shouldLogin]);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
      <Dialog onClose={handleClose} open={open} maxWidth="xs">
        <Box sx={{ paddingX: 2, paddingY: 4 }}>
          <Box>
            <Accordion>
              <AccordionSummary
                aria-controls="panel1a-content"
                id="panel1a-header"
                expandIcon={<ExpandMoreSharp />}
              >
                <Typography
                  variant="h5"
                  textAlign="center"
                  sx={{ margin: "auto" }}
                >
                  Sing up
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
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
                  id="regEmail"
                  label="Email"
                  variant="outlined"
                  fullWidth
                  size="small"
                  value={email}
                  onChange={handleEmailChange}
                  sx={{ marginBottom: 1 }}
                />
                <TextField
                  id="regPassword"
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
              </AccordionDetails>
            </Accordion>
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreSharp />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography
                  variant="h5"
                  textAlign="center"
                  sx={{ margin: "auto" }}
                >
                  Sign in
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <TextField
                  id="loginEmail"
                  label="Email"
                  variant="outlined"
                  fullWidth
                  size="small"
                  value={loginEmail}
                  onChange={handleLoginEmailChange}
                  sx={{ marginBottom: 1 }}
                />
                <TextField
                  id="loginPassword"
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
              </AccordionDetails>
            </Accordion>
          </Box>
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
          <Box sx={{ marginTop: 2 }}>
            <Typography variant="body2" textAlign="center">
              By using our services, you agree to our
              <Link
                underline="always"
                component={NavLink}
                to={TERMS}
                rel="noopener noreferrer"
                target="_blank"
              >
                Terms
              </Link>
              .
            </Typography>
          </Box>
        </Box>
      </Dialog>
      <Button onClick={handleClickOpen} variant="contained">
        <Box sx={{ display: { md: "block", xs: "none" } }}>
          Login / Register
        </Box>
        <Box sx={{ display: { md: "none", xs: "block" } }}>Login</Box>
      </Button>
    </>
  );
};
