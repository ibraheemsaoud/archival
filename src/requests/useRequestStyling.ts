import { useMutation, useQuery, useQueryClient } from "react-query";
import { Server } from "../config/server";
import api from "./apis";
import { Permission, Query, Role } from "appwrite";
import { IStyling, IStylingCreate } from "../interfaces/styling.interface";

export const useRequestStyling = (stylingId?: string) => {
  return useQuery<IStyling>(
    ["styling", stylingId],
    async () => {
      const data = await api.getDocument(
        Server.databaseID,
        Server.stylingCollectionId,
        stylingId!
      );
      if (data) {
        return data as IStyling;
      }
      throw new Error("Styling not found");
    },
    {
      enabled: !!stylingId,
      refetchOnMount: true,
      refetchOnWindowFocus: false,
      initialData: undefined,
    }
  );
};

export const useRequestStylingByUserId = (userId?: string) => {
  return useQuery<IStyling[]>(
    ["stylingsList"],
    async () => {
      const data = await api.listDocuments(
        Server.databaseID,
        Server.stylingCollectionId,
        [Query.equal("userId", [userId!])]
      );
      if (data.documents?.length > 0) {
        return data.documents as IStyling[];
      } else {
        return [];
      }
    },
    {
      enabled: !!userId,
      refetchOnMount: true,
      refetchOnWindowFocus: false,
      initialData: [],
    }
  );
};

export const useRequestCreateStyling = () => {
  const queryClient = useQueryClient();

  return useMutation(["stylingList"], async (styling: IStylingCreate) => {
    const data = await api.createDocument(
      Server.databaseID,
      Server.stylingCollectionId,
      styling,
      [
        Permission.update(Role.user(styling.userId)),
        Permission.delete(Role.user(styling.userId)),
      ]
    );
    queryClient.invalidateQueries(["stylingList"]);
    queryClient.invalidateQueries(["post", styling.mainPost]);
    return data;
  });
};

export const useRequestAddPostToStyling = (styling: IStyling) => {
  const queryClient = useQueryClient();

  return useMutation(["stylingList"], async (postId: string) => {
    // don't double add posts
    if (styling.posts.findIndex((post) => post.$id === postId) !== -1) {
      return undefined;
    }
    if (styling.mainPost.$id === postId) {
      return undefined;
    }

    const posts = styling.posts.map(post => post.$id)
    posts.push(postId);

    const data = await api.updateDocument(
      Server.databaseID,
      Server.stylingCollectionId,
      styling.$id,
      {
        userId: styling.userId,
        description: styling.description,
        imageUrl: styling.imageUrl,
        mainPost: styling.mainPost.$id,
        posts,
      } as IStylingCreate,
      [
        Permission.update(Role.user(styling.userId)),
        Permission.delete(Role.user(styling.userId)),
      ]
    );
    queryClient.invalidateQueries(["styling", styling.$id]);
    queryClient.invalidateQueries(["post", postId]);
    return data;
  });
};


export const useRequestRemovePostFromStyling = (styling: IStyling) => {
  const queryClient = useQueryClient();

  return useMutation(["stylingList"], async (postId: string) => {
    let posts = styling.posts.map(post => post.$id)
    posts = posts.filter(post => post !== postId)

    const data = await api.updateDocument(
      Server.databaseID,
      Server.stylingCollectionId,
      styling.$id,
      {
        userId: styling.userId,
        description: styling.description,
        imageUrl: styling.imageUrl,
        mainPost: styling.mainPost.$id,
        posts,
      } as IStylingCreate,
      [
        Permission.update(Role.user(styling.userId)),
        Permission.delete(Role.user(styling.userId)),
      ]
    );
    queryClient.invalidateQueries(["styling", styling.$id]);
    queryClient.invalidateQueries(["post", postId]);
    return data;
  });
};


export const useRequestDeleteStyling = () => {
  const queryClient = useQueryClient();

  return useMutation(["stylingList"], async (stylingId: string) => {
    const data = await api.deleteDocument(
      Server.databaseID,
      Server.stylingCollectionId,
      stylingId
    );
    queryClient.invalidateQueries(["stylingList"]);
    return data;
  });
};
