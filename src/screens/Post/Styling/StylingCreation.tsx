import { Box, Button, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { UploadImage, useUploadImage } from "../../../components/UploadImage";
import { useUser } from "../../../hooks";
import { requestUploadFile } from "../../../requests/requestUploadFile";
import { useRequestCreateStyling } from "../../../requests/useRequestStyling";

export const StylingCreation = ({
  postId,
  onDone,
}: {
  postId?: string;
  onDone: () => void;
}) => {
  const [description, setDescription] = useState("");
  const [outsideLink, setOutsideLink] = useState("");
  const { file, onChangeFile, onReset, pictureUrl, onRemoveFile } =
    useUploadImage({});
  const { mutate, isSuccess } = useRequestCreateStyling();
  const { user } = useUser();

  const onCreate = async () => {
    if (!user || !(pictureUrl || outsideLink)) return;
    let pictureLink = outsideLink;
    if (outsideLink?.length === 0) {
      pictureLink = (await requestUploadFile(file, user.$id)) || "";
    }
    mutate({
      description,
      mainPost: postId,
      userId: user.$id,
      imageUrl: pictureLink,
    });
  };

  useEffect(() => {
    if (isSuccess) {
      onRemoveFile();
      setDescription("");
      setOutsideLink("");
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
        Add Styling
      </Typography>
      <UploadImage
        onChangeFile={onChangeFile}
        file={file}
        onReset={onReset}
        pictureUrl={pictureUrl}
        height="144px"
        // width="108px"
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
      <Button variant="contained" onClick={onCreate} fullWidth>
        Create
      </Button>
    </Box>
  );
};
