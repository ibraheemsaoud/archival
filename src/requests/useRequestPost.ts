import { useMutation, useQuery, useQueryClient } from "react-query";
import { Server } from "../config/server";
import api from "./apis";
import { Permission, Query, Role } from "appwrite";
import { IPost, IPostCreate } from "../interfaces/post.interface";

export const useRequestPosts = (seasonId?: string, query?: string) => {
  const queries = [Query.equal("seasonId", [seasonId!])];
  if (query && query.length > 0) {
    queries.push(query);
  }
  return useQuery<IPost[]>(
    ["postList", seasonId, query],
    async () => {
      const data = await api.listDocuments(
        Server.databaseID,
        Server.postsCollectionId,
        queries
      );
      if (data.documents?.length > 0) {
        return data.documents as IPost[];
      }
      // eslint-disable-next-line no-throw-literal
      throw "posts not found";
    },
    {
      enabled: !!seasonId,
      refetchOnMount: true,
      refetchOnWindowFocus: false,
      keepPreviousData: true,
      initialData: [],
    }
  );
};

export const useRequestCreatePost = () => {
  const queryClient = useQueryClient();

  return useMutation(["postList"], async (post: IPostCreate) => {
    const data = await api.createDocument(
      Server.databaseID,
      Server.postsCollectionId,
      post,
      [
        Permission.update(Role.user(post.userId)),
        Permission.delete(Role.user(post.userId)),
      ]
    );
    queryClient.invalidateQueries(["postList"]);
    queryClient.invalidateQueries(["seasonData", post.seasonId]);
    return data;
  });
};
