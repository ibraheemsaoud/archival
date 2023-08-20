import { Box, Button, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { UploadImage, useUploadImage } from "../../components/UploadImage";
import { useRequestReference } from "../../requests/useRequestReference";
import { useUser } from "../../hooks";
import { requestUploadFile } from "../../requests/requestUploadFile";

export const ReferenceCreation = ({
  postId,
  onDone,
}: {
  postId: string;
  onDone: () => void;
}) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [outsideLink, setOutsideLink] = useState("");
  const [referenceLink, setReferenceLink] = useState("");
  const { file, onChangeFile, onReset, pictureUrl, onRemoveFile } =
    useUploadImage({});
  const { mutate, isSuccess } = useRequestReference();
  const { user } = useUser();

  const onCreate = async () => {
    if (!user || !pictureUrl) return;
    let pictureLink = outsideLink;
    if (outsideLink?.length === 0) {
      pictureLink = (await requestUploadFile(file)) || "";
    }
    let referenceType = "wikipedia";
    if (referenceLink.includes("youtube")) referenceType = "youtube";
    mutate({
      referenceTitle: title,
      referenceDescription: description,
      postId: postId,
      userId: user.$id,
      imageLink: pictureLink,
      reference_link: referenceLink,
      reference_type: referenceType as any,
    });
  };

  useEffect(() => {
    if (isSuccess) {
      onRemoveFile();
      setTitle("");
      setDescription("");
      setOutsideLink("");
      setReferenceLink("");
      onDone();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess]);

  return (
    <Box position="relative" padding="24px 12px">
      <Typography
        variant="h6"
        component="div"
        sx={{
          textDecoration: "underline",
          marginBottom: 1,
        }}
      >
        Add Reference
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
      <TextField
        id="filled-multiline-static"
        label="description"
        variant="filled"
        sx={{
          width: "-webkit-fill-available",
          marginBottom: 2,
        }}
        color="primary"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <TextField
        id="filled-multiline-static"
        label="reference link"
        variant="filled"
        sx={{
          width: "-webkit-fill-available",
          marginBottom: 2,
        }}
        color="primary"
        value={referenceLink}
        onChange={(e) => setReferenceLink(e.target.value)}
      />
      <Button variant="contained" onClick={onCreate} fullWidth>
        Create
      </Button>
    </Box>
  );
};
