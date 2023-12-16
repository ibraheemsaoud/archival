import { useMutation, useQuery, useQueryClient } from "react-query";
import { Server } from "../config/server";
import api from "./apis";
import { Permission, Query, Role } from "appwrite";
import { IPost, IPostCreate } from "../interfaces/post.interface";

export const useRequestPost = (postId?: string) => {
  return useQuery<IPost>(
    ["post", postId],
    async () => {
      const data = await api.getDocument(
        Server.databaseID,
        Server.postsCollectionId,
        postId!
      );
      if (data) {
        return data as IPost;
      }
      throw new Error("failed to load post, server might be down");
    },
    {
      enabled: !!postId,
      refetchOnMount: true,
      refetchOnWindowFocus: false,
      initialData: undefined,
    }
  );
};

export const useRequestSearchPosts = (query?: string) => {
  return useQuery<IPost[]>(
    ["postList", query],
    async () => {
      const data = await api.listDocuments(
        Server.databaseID,
        Server.postsCollectionId,
        [Query.search("search", query!)]
      );
      if (data) {
        return data.documents as IPost[];
      }
      throw new Error("failed to load search posts, server might be down");
    },
    {
      enabled: !!query,
      refetchOnMount: true,
      refetchOnWindowFocus: false,
      initialData: [],
    }
  );
};

export const useRequestCreatePost = () => {
  const queryClient = useQueryClient();

  return useMutation(["postList"], async (post: IPostCreate) => {
    const { seasonSlug, ...postData } = post;
    const data = await api.createDocument(
      Server.databaseID,
      Server.postsCollectionId,
      postData,
      [
        Permission.update(Role.user(post.userId)),
        Permission.delete(Role.user(post.userId)),
      ]
    );
    queryClient.invalidateQueries(["postList"]);
    queryClient.invalidateQueries(["season", seasonSlug]);
    return data;
  });
};

export const useRequestPosts = (seasonId?: string, query?: string) => {
  const requestQuery = seasonId ? [Query.equal("season", [seasonId])] : [];
  if (query) {
    requestQuery.push(query);
  }
  console.log(requestQuery);
  return useQuery<IPost[]>(
    ["postList", seasonId],
    async () => {
      const data = await api.listDocuments(
        Server.databaseID,
        Server.postsCollectionId,
        requestQuery
      );
      if (data) {
        return data.documents as IPost[];
      }
      throw new Error("failed to load posts, server might be down");
    },
    {
      enabled: !!seasonId,
      refetchOnMount: true,
      refetchOnWindowFocus: false,
      initialData: [] as IPost[],
    }
  );
};
