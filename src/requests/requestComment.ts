import api from "./apis";
import { Server } from "../config/server";
import { Query } from "appwrite";
import { IComment } from "../interfaces/comment.interface";

export const requestComments = async (postId?: string) => {
  if (!postId) {
    return {
      data: [],
      error: "missing postId",
    };
  }
  const data = await api.listDocuments(
    Server.databaseID,
    Server.commentsCollectionId,
    [Query.equal("postId", [postId])]
  );
  if (data.documents) {
    return {
      data: data.documents as IComment[],
      error: undefined,
    };
  }
  return {
    data: [],
    error: "failed to load comments, server might be down",
  };
};
