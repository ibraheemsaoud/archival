import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import { useUser } from "../../hooks";
import { AppWrapper } from "../../components";
import { useState } from "react";
import { useRequestCommentsByUserId, useRequestDeleteComment } from "../../requests/useRequestComment";

export const Profile = () => {
  const { isLoading, user, updatePrefs } = useUser();
  const [displayName, setDisplayName] = useState<string>(
    user?.prefs?.displayName || ""
  );
  const [imageURL, setImageURL] = useState<string>(user?.prefs?.imageURL || "");

  const { data: comments } = useRequestCommentsByUserId(user?.$id || "");
  const { mutate: onDelete } = useRequestDeleteComment();

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

  const deleteComment = (commentId: string) => () => {
    onDelete(commentId);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <AppWrapper>
      <Grid container spacing={2} padding={2}>
        <Grid item xs={12} md={4} />
        <Grid item xs={12} md={4}>
          <Box
            sx={(theme) => ({
              border: `1px solid ${theme.palette.divider}`,
              borderRadius: 1,
              paddingX: 2,
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
        <Grid item xs={12} md={12}>
          {comments?.length ? (
            <Typography variant="h6" component="div">
              Comments
            </Typography>
          ) : null}
          {comments?.map((comment) => (
            <Box
              sx={{
                display: "flex",
                borderRadius: 1,
                border: "1px solid #c4c4c4",
                overflow: "hidden",
              }}
            >
              <Box
                sx={{
                  backgroundImage: `url(${comment.post.pictureLink})`,
                  backgroundSize: "cover",
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "center",
                  width: "60px",
                  maxHeight: "60px",
                  minHeight: "60px",
                  marginRight: 1,
                }}
              />
              <Box sx={{ flex: 1 }}>
                <Typography variant="h6" component="div">
                  {comment.post.postTitle}
                </Typography>
                <Typography variant="body1" component="div">
                  {comment.comment}
                </Typography>
              </Box>
              <Button
                size="small"
                variant="text"
                color="red"
                onClick={deleteComment(comment.$id)}
                sx={{ maxHeight: "45px", marginTop: "auto" }}
              >
                Delete
              </Button>
            </Box>
          ))}
        </Grid>
      </Grid>
    </AppWrapper>
  );
};
