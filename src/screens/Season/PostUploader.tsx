import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { UploadImage, useUploadImage } from "../../components/UploadImage";
import { useRequestCreatePost } from "../../requests/useRequestPost";
import { useUser } from "../../hooks";
import { toast } from "react-hot-toast";
import { requestUploadFile } from "../../requests/requestUploadFile";
import { Server } from "../../config/server";
import { ISeason } from "../../interfaces/season.interface";
import { ExpandMore } from "@mui/icons-material";

export const PostUploader = ({ season }: { season: ISeason }) => {
  const [title, setTitle] = useState("");
  const [outsideLink, setOutsideLink] = useState("");
  const { file, onChangeFile, onReset, pictureUrl, onRemoveFile } =
    useUploadImage({});
  const { mutate, isSuccess, error } = useRequestCreatePost();
  const { user } = useUser();

  const onCreate = async () => {
    if (!user) return;
    let pictureLink = undefined;
    if (outsideLink === "") {
      pictureLink = await requestUploadFile(file, user.$id);
    }
    if (pictureLink || outsideLink !== "") {
      mutate({
        postTitle: title,
        pictureLink: pictureLink || outsideLink,
        season: season.$id,
        seasonSlug: season.slug,
        userId: user.$id,
        search: `${title} ${season.name} ${season.brand?.name}`,
      });
    }
  };

  useEffect(() => {
    if (isSuccess) {
      onRemoveFile();
      setTitle("");
      setOutsideLink("");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess]);

  useEffect(() => {
    if (error) {
      toast.error(error.toString());
    }
  }, [error]);

  if (!user) return null;
  if (user.$id !== Server.adminId) return null;

  return (
    <Accordion sx={{ marginTop: 2 }}>
      <AccordionSummary
        expandIcon={<ExpandMore />}
        aria-controls="panel1-content"
        id="panel1-header"
      >
        <Typography variant="h6" component="div">
          Post Uploader
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Box>
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
                id="outsideLink"
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
            id="title"
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
      </AccordionDetails>
    </Accordion>
  );
};
