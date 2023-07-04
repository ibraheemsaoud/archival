import { useMutation, useQuery, useQueryClient } from "react-query";
import api from "./apis";
import { Server } from "../config/server";
import { Permission, Query, Role } from "appwrite";
import { IComment, ICommentCreate } from "../interfaces/comment.interface";
import { turnStringToValidTeamName } from "../helpers";

export const useRequestComments = (entryId?: string) => {
  return useQuery<IComment[]>(
    ["comments", entryId],
    async () => {
      const response = await api.listDocuments(
        Server.databaseID,
        Server.commentCollectionId,
        [Query.equal("entryId", [entryId!]), Query.orderDesc("$createdAt")]
      );
      return response.documents;
    },
    {
      enabled: !!entryId,
      refetchOnWindowFocus: false,
      initialData: [],
      refetchInterval: 60000,
    }
  );
};

export const useRequestCreateComment = () => {
  const queryClient = useQueryClient();
  return useMutation(async (comment: ICommentCreate) => {
    const response = await api.createDocument(
      Server.databaseID,
      Server.commentCollectionId,
      comment,
      [
        Permission.update(Role.user(comment.userId)),
        Permission.delete(Role.user(comment.userId)),
        Permission.delete(Role.team(turnStringToValidTeamName(comment.eraId))),
      ]
    );
    queryClient.invalidateQueries("comments");
    return response;
  });
};

export const useRequestDeleteComment = () => {
  const queryClient = useQueryClient();
  return useMutation(async (comment: IComment) => {
    const response = await api.deleteDocument(
      Server.databaseID,
      Server.commentCollectionId,
      comment.$id
    );
    queryClient.invalidateQueries("comments");
    return response;
  });
};
