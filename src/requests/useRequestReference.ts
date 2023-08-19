import { useMutation, useQueryClient } from "react-query";
import { Server } from "../config/server";
import api from "./apis";
import { Permission, Role } from "appwrite";
import { IReferenceCreate } from "../interfaces/reference.interface";

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
    // queryClient.invalidateQueries(["seasonData", post.seasonId]);
    return data;
  });
};
