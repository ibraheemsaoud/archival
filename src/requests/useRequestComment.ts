import { useMutation, useQuery, useQueryClient } from "react-query";
import { Server } from "../config/server";
import api from "./apis";
import { Permission, Query, Role } from "appwrite";
import { IComment, ICommentCreate } from "../interfaces/comment.interface";

export const useRequestComments = (postId: string) => {
  return useQuery<IComment[]>(
    ["comment", postId],
    async () => {
      const data = await api.listDocuments(
        Server.databaseID,
        Server.commentsCollectionId,
        [Query.equal("postId", [postId!])]
      );
      if (data.documents?.length > 0) {
        return data.documents as IComment[];
      }
      // eslint-disable-next-line no-throw-literal
      throw "Season not found";
    },
    {
      enabled: !!postId,
      refetchOnMount: true,
      refetchOnWindowFocus: false,
      initialData: [],
    }
  );
};

export const useRequestCreateComment = (postId: string) => {
  const queryClient = useQueryClient();

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
    queryClient.invalidateQueries(["comment", postId]);
    return data;
  });
};

export const useRequestDeleteComment = (postId: string) => {
  const queryClient = useQueryClient();

  return useMutation(["comment", postId], async (commentId: string) => {
    const data = await api.deleteDocument(
      Server.databaseID,
      Server.commentsCollectionId,
      commentId
    );
    queryClient.invalidateQueries(["comment", postId]);
    return data;
  });
};
