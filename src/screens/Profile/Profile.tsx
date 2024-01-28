import {
  Box,
  Button,
  FormControlLabel,
  Grid,
  TextField,
  Typography,
  Checkbox,
} from "@mui/material";
import { useUser } from "../../hooks";
import { AppWrapper, Loader, TopToolbar } from "../../components";
import { useState } from "react";
import { useRequestCommentsByUserId } from "../../requests/useRequestComment";
import { ProfileComments } from "./ProfileComments";
import { useRequestReferencesByUserId } from "../../requests/useRequestReference";
import { ProfilePostReferences } from "./ProfilePostReferences";
import { SeasonPostReferences } from "./SeasonPostReferences";
import { UploadImage, useUploadImage } from "../../components/UploadImage";
import { HOME } from "../../consts/links.const";
import { requestUploadFile } from "../../requests/requestUploadFile";

export const Profile = () => {
  const { isLoading, user, updatePrefs } = useUser();
  const defaultIsDark =
    user?.prefs?.isDarkMode == undefined
      ? window.matchMedia &&
        window.matchMedia("(prefers-color-scheme: dark)").matches
      : user?.prefs?.isDarkMode;

  const [isDarkMode, setIsDarkMode] = useState<boolean>(defaultIsDark);
  const [displayName, setDisplayName] = useState<string>(
    user?.prefs?.displayName || ""
  );

  const {
    file,
    onChangeFile,
    onReset,
    pictureUrl: imageURL,
    onRemoveFile,
  } = useUploadImage({ pictureUrl: user?.prefs?.imageURL || "" });

  const { data: comments } = useRequestCommentsByUserId(user?.$id || "");
  const { data: references } = useRequestReferencesByUserId(user?.$id || "");

  const postReferences = references?.filter((reference) => reference.post);
  const seasonReferences = references?.filter((reference) => reference.season);

  const handleDisplayNameChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setDisplayName(event.target.value);
  };

  const onUpdate = async () => {
    if (!file) {
      updatePrefs({
        ...user?.prefs,
        displayName,
        isDarkMode,
      });
      return;
    }
    const imageURL = (await requestUploadFile(file, user!.$id)) || "";
    updatePrefs({
      ...user?.prefs,
      displayName,
      imageURL,
      isDarkMode,
    });
    onRemoveFile();
  };

  const handleIsInDarkMode = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsDarkMode((event.target as HTMLInputElement).checked);
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <AppWrapper>
      <TopToolbar backAddress={HOME} title="" />
      <Grid container spacing={2} padding={2}>
        <Grid item xs={12} md={4} />
        <Grid item xs={12} md={4}>
          <Box
            sx={(theme) => ({
              borderBottom: `1px solid ${theme.palette.divider}`,
              paddingBottom: 2,
            })}
          >
            <Typography variant="h6" sx={{ marginBottom: 1 }}>
              Edit Profile
            </Typography>
            <UploadImage
              onChangeFile={onChangeFile}
              file={file}
              onReset={onReset}
              pictureUrl={imageURL}
              height="144px"
            />
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
              id="email"
              label="Email"
              variant="standard"
              fullWidth
              defaultValue={user?.email}
              sx={{ marginBottom: 2 }}
              disabled
            />
            <FormControlLabel
              control={
                <Checkbox checked={isDarkMode} onChange={handleIsInDarkMode} />
              }
              label="Dark Mode"
            />
            <Button variant="contained" fullWidth onClick={onUpdate}>
              Update
            </Button>
          </Box>
        </Grid>
        <ProfileComments comments={comments} />
        <ProfilePostReferences references={postReferences} />
        <SeasonPostReferences references={seasonReferences} />
      </Grid>
    </AppWrapper>
  );
};
