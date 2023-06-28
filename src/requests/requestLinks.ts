import { Server } from "../config/server";
import { Query } from "appwrite";
import api from "./apis";
import { ILink } from "../interfaces/timelineEntry.interface";

export const requestLinks = async (
  eraId?: string
) => {
  if (!eraId) {
    return {
      data: [] as ILink[],
      error: "No eraId",
    };
  }
  const data = await api.listDocuments(
    Server.databaseID,
    Server.linkCollectionId,
    [Query.equal("eraId", [eraId])]
  );
  if (data.documents) {
    return {
      data: data.documents as ILink[],
      error: undefined,
    };
  }
  return {
    data: [] as ILink[],
    error: "No data",
  };
};
