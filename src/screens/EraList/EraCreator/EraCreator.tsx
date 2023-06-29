import { Box, Button, TextField } from "@mui/material";
import { useState } from "react";
import { requestCreateEra } from "../../../requests";
import { useUser } from "../../../hooks/useUser";

export const EraCreator = ({ topicId }: { topicId: string }) => {
  const { user } = useUser();
  const isAdmin = false;
  const [title, setTitle] = useState("");
  const [id, setId] = useState("");
  const [coverImageUrl, setCoverImageUrl] = useState("");
  const [description, setDescription] = useState("");

  const onClick = async () => {
    await requestCreateEra(topicId, {
      title,
      description,
      coverImageUrl,
      id,
      ownerId: user!.$id,
    });
    window.location.reload();
  };

  const onChangeName = (event: any) => {
    setTitle(event.target.value);
    setId(event.target.value.toLowerCase().replace(/ /g, "-"));
  };

  const onChangeId = (event: any) => {
    setId(event.target.value);
  };

  const onChangeCoverImageUrl = (event: any) => {
    setCoverImageUrl(event.target.value);
  };

  const onChangeDescription = (event: any) => {
    setDescription(event.target.value);
  };

  if (!isAdmin) {
    return null;
  }

  return (
    <Box
      display="flex"
      flexDirection="column"
      sx={(theme) => ({
        padding: 2,
        border: `1px solid ${theme.palette.divider}`,
        borderRadius: 2,
        margin: 2,
        width: "300px",
        height: "min-content",
      })}
    >
      <TextField
        id="standard-basic"
        label="Title"
        variant="standard"
        value={title}
        onChange={onChangeName}
      />
      <TextField
        id="standard-basic"
        label="Id"
        variant="standard"
        value={id}
        onChange={onChangeId}
      />
      <TextField
        id="standard-basic"
        label="Image URL"
        variant="standard"
        value={coverImageUrl}
        onChange={onChangeCoverImageUrl}
      />
      <TextField
        id="standard-multiline-static"
        label="Description"
        multiline
        rows={4}
        variant="standard"
        value={description}
        onChange={onChangeDescription}
      />
      <Button variant="contained" sx={{ marginTop: 2 }} onClick={onClick}>
        Create
      </Button>
    </Box>
  );
};
