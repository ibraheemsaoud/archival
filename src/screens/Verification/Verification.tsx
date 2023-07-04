import {
  Box,
  CircularProgress,
  Dialog,
  DialogTitle,
  Typography,
} from "@mui/material";

export const Verification = () => (
  <Dialog open={true}>
    <Box paddingX={6} paddingY={4} textAlign="center">
      <DialogTitle variant="h5" textAlign="center">
        Email Verification
      </DialogTitle>
      <Typography variant="body1" textAlign="center">
        You will be redirected to the dashboard once your email is verified.
      </Typography>

      <Typography variant="body1" textAlign="center" marginBottom={4}>
        Please give it a few seconds.
      </Typography>

      <CircularProgress />
    </Box>
  </Dialog>
);
