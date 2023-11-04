import { useMutation, useQueryClient } from "react-query";
import { Server } from "../config/server";
import api from "./apis";
import { Permission, Role } from "appwrite";
import { IPostCreate } from "../interfaces/post.interface";

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
