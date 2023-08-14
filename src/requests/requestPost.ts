import api from "./apis";
import { Server } from "../config/server";
import { IPost } from "../interfaces/post.interface";
import { Query } from "appwrite";

export const requestPosts = async (seasonId: string) => {
  const data = await api.listDocuments(
    Server.databaseID,
    Server.postsCollectionId,
    [Query.equal("seasonId", [seasonId])]
  );
  if (data.documents) {
    return {
      data: data.documents as IPost[],
      error: undefined,
    };
  }
  return {
    data: [],
    error: "failed to load posts, server might be down",
  };
};

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
