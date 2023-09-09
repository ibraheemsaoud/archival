import api from "./apis";
import { Server } from "../config/server";
import { Query } from "appwrite";
import { ISeason } from "../interfaces/season.interface";

export const requestSeason = async (slug?: string) => {
  if (!slug)
    return {
      data: undefined,
      error: "no slug provided",
    };
  const data = await api.listDocuments(
    Server.databaseID,
    Server.seasonsCollectionId,
    [Query.equal("slug", [slug]), Query.equal("isPublic", [true])]
  );
  if (data.documents?.length > 0) {
    return {
      data: data.documents[0] as ISeason,
      error: undefined,
    };
  }
  return {
    data: undefined,
    error:
      "failed to load season, server might be down or you loaded the incorrect season",
  };
};
