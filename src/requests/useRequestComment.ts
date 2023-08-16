import { useMutation } from "react-query";
import { Server } from "../config/server";
import api from "./apis";
import { Permission, Role } from "appwrite";
import { ICommentCreate } from "../interfaces/comment.interface";

export const useRequestComment = (postId: string) => {
  return useMutation(["comment", postId], async (comment: ICommentCreate) => {
    const data = await api.createDocument(
      Server.databaseID,
      Server.commentsCollectionId,
      comment,
      [
        Permission.update(Role.user(comment.userId)),
        Permission.delete(Role.user(comment.userId)),
      ]
    );
    return data;
  });
};
