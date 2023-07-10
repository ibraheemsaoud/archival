import { useEffect, useState } from "react";
import { ITimelineEntry } from "../../../../interfaces/timelineEntry.interface";
import { Box, Button } from "@mui/material";
import {
  UploadImage,
  useUploadImage,
} from "../../../../components/UploadImage";
import api from "../../../../requests/apis";
import { ID } from "appwrite";
import { Server } from "../../../../config/server";
import { toast } from "react-hot-toast";
import { H5TextField } from "../../../../components/H5TextField";
import { Body1TextField } from "../../../../components/Body1TextField";

interface IEditMedia {
  entry: ITimelineEntry;
  onChange: (entry: ITimelineEntry) => void;
  onDelete: (entry: ITimelineEntry) => void;
  onMoveDown: (entry: ITimelineEntry) => void;
  onMoveUp: (entry: ITimelineEntry) => void;
}

export const EditMedia = ({
  entry,
  onChange,
  onDelete,
  onMoveDown,
  onMoveUp,
}: IEditMedia) => {
  const [title, setTitle] = useState(entry.title || "");
  const [description, setDescription] = useState(entry.description || "");
  const [order, setOrder] = useState(entry.order || 0);
  const { file, onChangeFile, onReset, pictureUrl, onRemoveFile } =
    useUploadImage({
      pictureUrl: entry.link,
    });

  useEffect(() => {
    setTitle(entry.title || "");
    setDescription(entry.description || "");
    setOrder(entry.order || 0);
    onRemoveFile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [entry]);

  const onChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };
  const onChangeDescription = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDescription(e.target.value);
  };
  const onChangeOrder = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOrder(parseInt(e.target.value));
  };
  const onHandleChange = async () => {
    try {
      if (file) {
        const fileData = await api.uploadFile(
          Server.entriesPicturesBucketId,
          ID.unique(),
          file
        );
        if (fileData.$id) {
          entry.link = `https://cloud.appwrite.io/v1/storage/buckets/${Server.entriesPicturesBucketId}/files/${fileData.$id}/view?project=Archival`;
        } else {
          entry.link = undefined;
        }
      }
    } catch (e) {
      toast.error("Failed to upload file");
      console.error(e);
      return;
    }

    onChange({
      ...entry,
      title,
      description,
      order,
    });
  };

  const onHandleDelete = () => {
    onDelete(entry);
  };

  const onHandleMoveUp = () => {
    onMoveUp(entry);
  };

  const onHandleMoveDown = () => {
    onMoveDown(entry);
  };

  return (
    <Box
      sx={{
        marginY: 2,
      }}
    >
      <H5TextField
        id="standard-basic"
        placeholder="Title"
        variant="standard"
        hiddenLabel
        fullWidth
        value={title}
        onChange={onChangeTitle}
      />
      <Body1TextField
        id="standard-basic"
        placeholder="Description"
        variant="standard"
        fullWidth
        value={description}
        onChange={onChangeDescription}
        multiline
        maxRows={4}
        sx={{ marginBottom: "30px" }}
      />
      <UploadImage
        file={file}
        onChangeFile={onChangeFile}
        onReset={onReset}
        pictureUrl={pictureUrl}
        height="350px"
      />
      <H5TextField
        id="order"
        placeholder="Order"
        variant="standard"
        type="number"
        fullWidth
        value={order}
        onChange={onChangeOrder}
        sx={{ marginBottom: 2 }}
      />
      <Button onClick={onHandleChange}>Update</Button>
      <Button onClick={onHandleDelete}>Delete</Button>
      <Button onClick={onHandleMoveUp}>Move Up</Button>
      <Button onClick={onHandleMoveDown}>Move Down</Button>
    </Box>
  );
};
