import api from "./apis";
import { Server } from "../config/server";
import { Query } from "appwrite";
import { IFashionWeek } from "../interfaces/fashionWeek.interface";

export const requestFashionWeek = async (slug?: string) => {
  if (!slug)
    return {
      data: undefined,
      error: "no slug provided",
    };
  const data = await api.listDocuments(
    Server.databaseID,
    Server.fashionWeeksCollectionId,
    [Query.equal("slug", [slug])]
  );
  if (data.documents?.length > 0) {
    return {
      data: data.documents[0] as IFashionWeek,
      error: undefined,
    };
  }
  return {
    data: undefined,
    error:
      "failed to load fashion week, server might be down or you loaded the incorrect fashion week",
  };
};
