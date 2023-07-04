import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  Grid,
  Typography,
} from "@mui/material";
import { verifyEmail } from "../requests";

export const VerifyEmailModal = ({ logout }: { logout: () => void }) => {
  const handleResendEmail = () => {
    verifyEmail();
  };

  return (
    <Dialog open={true}>
      <Box paddingX={6} paddingY={4}>
        <DialogTitle variant="h5" textAlign="center">
          Email Verification
        </DialogTitle>
        <Typography variant="body1" textAlign="center">
          We sent you an email to verify your account, please do :D
        </Typography>
        <Typography variant="body1" textAlign="center">
          For the best experience, keep this page open and click the link we
          sent you in the email.
        </Typography>
        <Grid container marginTop={4} marginBottom={2} spacing={1}>
          <Grid item xs={12} md={5}>
            <Button variant="text" onClick={logout} color="error" fullWidth>
              Logout
            </Button>
          </Grid>
          <Grid item xs={12} md={2} />
          <Grid item xs={12} md={5}>
            <Button variant="contained" onClick={handleResendEmail} fullWidth>
              resend email
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Dialog>
  );
};
