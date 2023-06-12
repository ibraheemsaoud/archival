import { Box, Button, TextField } from "@mui/material";
import { useUser } from "../../../hooks";
import { useState } from "react";
import { useRequestCreateEra } from "../../../requests";

export const CreateNewEra = ({ topicId }: { topicId: string }) => {
  const { user } = useUser();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const { mutate: createEra } = useRequestCreateEra();

  const onClick = () => {
    createEra({ title, description, topicId, ownerId: user.id });
    setTitle("");
    setDescription("");
  };

  const onChangeName = (event: any) => {
    setTitle(event.target.value);
  };

  const onChangeDescription = (event: any) => {
    setDescription(event.target.value);
  };

  if (user.userType !== "admin") {
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
