import api from "./apis";
import { Server } from "../config/server";
import { Query } from "appwrite";
import { IReference } from "../interfaces/reference.interface";

export const requestReferences = async (postId?: string) => {
  if (!postId) {
    return {
      data: [],
      error: "failed to load references, server might be down",
    };
  }
  const data = await api.listDocuments(
    Server.databaseID,
    Server.referencesCollectionId,
    [Query.equal("postId", [postId])]
  );
  if (data.documents) {
    return {
      data: data.documents as IReference[],
      error: undefined,
    };
  }
  return {
    data: [],
    error: "failed to load references, server might be down",
  };
};
