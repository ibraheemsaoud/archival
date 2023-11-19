import { useMutation, useQuery, useQueryClient } from "react-query";
import { Server } from "../config/server";
import api from "./apis";
import { Permission, Query, Role } from "appwrite";
import { IStyling, IStylingCreate } from "../interfaces/styling.interface";

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
      }
      // eslint-disable-next-line no-throw-literal
      throw "styling not found";
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
