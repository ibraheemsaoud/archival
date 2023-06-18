import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { useState } from "react";
import { requsetCreateUser } from "../../../requests";
import { useFirebase } from "../../../hooks";

export const ProfileSetup = () => {
  const { db, user } = useFirebase();
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");

  const onChangeUsername = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  const onSubmit = async () => {
    if (username.length < 3) {
      setError("Username must be at least 3 characters long");
    } else {
      const { error: creationError, data } = await requsetCreateUser(
        db,
        user?.uid,
        username
      );
      setError(creationError || "");
      if (data?.username) {
        window.location.reload();
      }
    }
  };

  return (
    <Dialog open>
      <DialogTitle variant="h5">Profile Setup</DialogTitle>
      <DialogContent>
        <TextField
          id="username"
          label="Username"
          variant="standard"
          fullWidth
          value={username}
          onChange={onChangeUsername}
          sx={{ marginBottom: 2 }}
          error={!!error}
          helperText={error}
        />
        <Box textAlign="end">
          <Button variant="contained" onClick={onSubmit}>
            Save
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
};
