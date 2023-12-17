import { ID, Permission, Role } from "appwrite";
import { Server } from "../config/server";
import api from "./apis";
import { toast } from "react-hot-toast";

export const requestUploadFile = async (file: File | null, userId: string) => {
  try {
    if (file) {
      const fileData = await api.uploadFile(
        Server.entriesPicturesBucketId,
        ID.unique(),
        file,
        [Permission.delete(Role.user(userId))]
      );
      if (fileData.$id) {
        return `${Server.endpoint}/storage/buckets/${Server.entriesPicturesBucketId}/files/${fileData.$id}/view?project=Archival`;
      } else {
        return undefined;
      }
    }
  } catch (e) {
    toast.error("Failed to upload file");
    return undefined;
  }
  return undefined;
};

export const requestDeleteFile = async (fileLink: string) => {
  const fileId = fileLink.split("/").slice(-2)[0];
  try {
    if (fileId) {
      await api.deleteFile(Server.entriesPicturesBucketId, fileId);
      return;
    }
  } catch (e) {
    toast.error("Failed to upload file");
    return undefined;
  }
  return undefined;
};
