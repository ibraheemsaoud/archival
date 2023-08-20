import { useMutation, useQuery, useQueryClient } from "react-query";
import { Server } from "../config/server";
import api from "./apis";
import { Permission, Query, Role } from "appwrite";
import { useUser } from "../hooks";
import { IFollow, IFollowCreate } from "../interfaces/follow.interface";

export const useRequestFollows = (targetType: string) => {
  const { user } = useUser();
  return useQuery<IFollow[]>(
    ["follows", user?.$id, targetType],
    async () => {
      const data = await api.listDocuments(
        Server.databaseID,
        Server.followsCollectionId,
        [
          Query.equal("userId", [user?.$id!]),
          Query.equal("targetType", [targetType]),
        ]
      );
      if (data.documents?.length > 0) {
        return data.documents as IFollow[];
      }
      return [] as IFollow[];
    },
    {
      enabled: !!user?.$id,
      refetchOnMount: true,
      refetchOnWindowFocus: false,
      initialData: [],
    }
  );
};

export const useRequestFollow = () => {
  const queryClient = useQueryClient();

  return useMutation(["follows"], async (follow: IFollowCreate) => {
    const data = await api.createDocument(
      Server.databaseID,
      Server.followsCollectionId,
      follow,
      [
        Permission.read(Role.user(follow.userId)),
        Permission.update(Role.user(follow.userId)),
        Permission.delete(Role.user(follow.userId)),
      ]
    );
    queryClient.invalidateQueries([
      "follows",
      follow.userId,
      follow.targetType,
    ]);
    return data;
  });
};

export const useRequestUnfollow = () => {
  const queryClient = useQueryClient();

  return useMutation(["follows"], async (follow: IFollow) => {
    const data = await api.deleteDocument(
      Server.databaseID,
      Server.followsCollectionId,
      follow.$id
    );
    queryClient.invalidateQueries([
      "follows",
      follow.userId,
      follow.targetType,
    ]);
    return data;
  });
};
