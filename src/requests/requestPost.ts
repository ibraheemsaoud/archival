import api from "./apis";
import { Server } from "../config/server";
import { IPost } from "../interfaces/post.interface";

export const requestPost = async (postId?: string) => {
  if (!postId) {
    return {
      data: [],
      error: "failed to load post, server might be down",
    };
  }
  const data = await api.getDocument(
    Server.databaseID,
    Server.postsCollectionId,
    postId
  );
  if (data) {
    return {
      data: data as IPost,
      error: undefined,
    };
  }
  return {
    data: [],
    error: "failed to load post, server might be down",
  };
};
