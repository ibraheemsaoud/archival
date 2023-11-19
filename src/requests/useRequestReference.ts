import { useMutation, useQuery, useQueryClient } from "react-query";
import { Server } from "../config/server";
import api from "./apis";
import { Permission, Query, Role } from "appwrite";
import {
  IReference,
  IReferenceCreate,
} from "../interfaces/reference.interface";

export const useRequestReferencesByUserId = (userId?: string) => {
  return useQuery<IReference[]>(
    ["referenceList"],
    async () => {
      const data = await api.listDocuments(
        Server.databaseID,
        Server.referencesCollectionId,
        [Query.equal("userId", [userId!])]
      );
      if (data.documents?.length > 0) {
        return data.documents as IReference[];
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

export const useRequestReference = () => {
  const queryClient = useQueryClient();

  return useMutation(["referenceList"], async (reference: IReferenceCreate) => {
    const data = await api.createDocument(
      Server.databaseID,
      Server.referencesCollectionId,
      reference,
      [
        Permission.update(Role.user(reference.userId)),
        Permission.delete(Role.user(reference.userId)),
      ]
    );
    queryClient.invalidateQueries(["referenceList"]);
    queryClient.invalidateQueries(["post", reference.post]);
    return data;
  });
};

export const useRequestDeleteReference = () => {
  const queryClient = useQueryClient();

  return useMutation(
    ["referenceList"],
    async (referenceId: string) => {
      const data = await api.deleteDocument(
        Server.databaseID,
        Server.referencesCollectionId,
        referenceId
      );
      queryClient.invalidateQueries(["referenceList"]);
      return data;
    }
  );
};
