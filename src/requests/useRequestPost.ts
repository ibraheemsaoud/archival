import { useMutation, useQuery, useQueryClient } from "react-query";
import { Server } from "../config/server";
import api from "./apis";
import { Permission, Role } from "appwrite";
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
    queryClient.invalidateQueries(["seasonData", post.season]);
    return data;
  });
};
