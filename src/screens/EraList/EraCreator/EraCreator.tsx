import { Box, Button, TextField } from "@mui/material";
import { useFirebase } from "../../../hooks";
import { useState } from "react";
import { requestCreateEra } from "../../../requests";

export const EraCreator = ({ topicId }: { topicId: string }) => {
  const { db, user } = useFirebase();
  const [title, setTitle] = useState("");
  const [id, setId] = useState("");
  const [coverImageUrl, setCoverImageUrl] = useState("");
  const [description, setDescription] = useState("");

  const onClick = async () => {
    await requestCreateEra(db, topicId, {
      title,
      description,
      coverImageUrl,
      id,
      ownerId: user!.uid,
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

  // TODO - add validation

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
