import { ID } from "appwrite";
import { Server } from "../config/server";
import api from "./apis";
import { toast } from "react-hot-toast";

export const requestUploadFile = async (file: File | null) => {
  try {
    if (file) {
      const fileData = await api.uploadFile(
        Server.entriesPicturesBucketId,
        ID.unique(),
        file
      );
      if (fileData.$id) {
        return `https://cloud.appwrite.io/v1/storage/buckets/${Server.entriesPicturesBucketId}/files/${fileData.$id}/view?project=Archival`;
      } else {
        return undefined;
      }
    }
  } catch (e) {
    toast.error("Failed to upload file");
    console.error(e);
    return undefined;
  }
  return undefined;
};
