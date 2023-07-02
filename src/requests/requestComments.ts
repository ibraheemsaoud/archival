import { Permission, Query, Role } from "appwrite";
import { Server } from "../config/server";
import { IComment, ICommentCreate } from "../interfaces/comment.interface";
import api from "./apis";

export const requestComments = async (entryId?: string) => {
  if (!entryId) {
    return {
      data: undefined,
      error: "No entryId",
    };
  }
  try {
    const data = await api.listDocuments(
      Server.databaseID,
      Server.commentCollectionId,
      [Query.equal("entryId", [entryId])]
    );

    return {
      data: data.documents as IComment[],
      error: undefined,
    };
  } catch (error) {
    return {
      data: undefined,
      error: error as string,
    };
  }
};

export const requestCreateComment = async (comment: ICommentCreate) => {
  if (!comment) return { data: false, error: "No comment" };
  try {
    const data = await api.createDocument(
      Server.databaseID,
      Server.commentCollectionId,
      { ...comment },
      [
        Permission.update(Role.user(comment.userId)),
        Permission.delete(Role.user(comment.userId)),
      ]
    );
    if (data.documents) {
      return {
        data: true,
        error: undefined,
      };
    }
  } catch (e) {
    return {
      data: false,
      error: e as string,
    };
  }
};
