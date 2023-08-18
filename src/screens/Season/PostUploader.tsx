import { Box, Button, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { UploadImage, useUploadImage } from "../../components/UploadImage";
import { useRequestCreatePost } from "../../requests/useRequestPost";
import { useUser } from "../../hooks";
import { toast } from "react-hot-toast";
import { requestUploadFile } from "../../requests/requestUploadFile";

export const PostUploader = ({ seasonId }: { seasonId: string }) => {
  const [title, setTitle] = useState("");
  const [outsideLink, setOutsideLink] = useState("");
  const { file, onChangeFile, onReset, pictureUrl, onRemoveFile } =
    useUploadImage({});
  const { mutate, isSuccess, error } = useRequestCreatePost();
  const { user } = useUser();

  const onCreate = async () => {
    if (!user || !pictureUrl) return;
    let pictureLink = undefined;
    if (outsideLink !== "") {
      pictureLink = await requestUploadFile(file);
    }
    if (pictureLink || outsideLink !== "") {
      mutate({
        postTitle: title,
        pictureLink: pictureLink || outsideLink,
        seasonId,
        userId: user.$id,
      });
    }
  };

  useEffect(() => {
    if (isSuccess) {
      onRemoveFile();
      setTitle("");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess]);

  useEffect(() => {
    if (error) {
      toast.error(error.toString());
    }
  }, [error]);

  if (!user) return null;
  if (user.$id !== "649b64af3576d64d457f") return null;

  return (
    <Box
      sx={{
        border: "1px solid",
        margin: 2,
        padding: 1,
        borderRadius: 2,
      }}
    >
      <Typography
        variant="h6"
        component="div"
        sx={{
          textDecoration: "underline",
          marginBottom: 1,
        }}
      >
        Post Uploader
      </Typography>
      <UploadImage
        onChangeFile={onChangeFile}
        file={file}
        onReset={onReset}
        pictureUrl={pictureUrl}
        height="350px"
      />
      {!file && (
        <>
          OR
          <TextField
            id="filled-multiline-static"
            label="picture link"
            variant="filled"
            sx={{
              width: "-webkit-fill-available",
              marginBottom: 2,
            }}
            color="primary"
            value={outsideLink}
            onChange={(e) => setOutsideLink(e.target.value)}
          />
        </>
      )}
      <TextField
        id="filled-multiline-static"
        label="title"
        variant="filled"
        sx={{
          width: "-webkit-fill-available",
          marginBottom: 2,
        }}
        color="primary"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <Button variant="contained" onClick={onCreate} fullWidth>
        Create
      </Button>
    </Box>
  );
};
