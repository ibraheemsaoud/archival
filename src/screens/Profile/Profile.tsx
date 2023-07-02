import { Box, Button, Grid, TextField } from "@mui/material";
import { useUser } from "../../hooks";
import { AppWrapper } from "../../components";
import { useState } from "react";

export const Profile = () => {
  const { isLoading, user, updatePrefs } = useUser();
  const [displayName, setDisplayName] = useState<string>(user?.prefs?.displayName || "");
  const [imageURL, setImageURL] = useState<string>(user?.prefs?.imageURL || "");

  const handleDisplayNameChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setDisplayName(event.target.value);
  };

  const handleImageURLChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setImageURL(event.target.value);
  };

  const onUpdate = () => {
    updatePrefs({ ...user?.prefs, displayName, imageURL });
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <AppWrapper>
      <Grid container spacing={2}>
        <Grid item xs={12} md={4} />
        <Grid item xs={12} md={4}>
          <Box
            sx={(theme) => ({
              border: `1px solid ${theme.palette.divider}`,
              borderRadius: 1,
              marginTop: 4,
              paddingX: 2,
              marginX: 2,
              paddingTop: 2,
              paddingBottom: 2,
            })}
          >
            <TextField
              id="displayName"
              label="Display Name"
              variant="standard"
              fullWidth
              defaultValue={user?.prefs?.displayName}
              sx={{ marginBottom: 2 }}
              onChange={handleDisplayNameChange}
            />
            <TextField
              id="imageURL"
              label="Image link"
              variant="standard"
              fullWidth
              defaultValue={user?.prefs?.imageURL}
              sx={{ marginBottom: 2 }}
              onChange={handleImageURLChange}
            />
            <TextField
              id="email"
              label="Email"
              variant="standard"
              fullWidth
              defaultValue={user?.email}
              sx={{ marginBottom: 2 }}
              disabled
            />
            <Button variant="contained" fullWidth onClick={onUpdate}>
              Update
            </Button>
          </Box>
        </Grid>
      </Grid>
    </AppWrapper>
  );
};
