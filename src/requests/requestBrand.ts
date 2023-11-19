import api from "./apis";
import { Server } from "../config/server";
import { Query } from "appwrite";
import { IBrand } from "../interfaces/brand.interface";

export const requestBrands = async () => {
  const data = await api.listDocuments(
    Server.databaseID,
    Server.brandsCollectionId,
    [Query.equal("isPublic", [true])]
  );
  if (data.documents) {
    return {
      data: data.documents as IBrand[],
      error: undefined,
    };
  }
  return {
    data: [],
    error: "failed to load brands, server might be down",
  };
};
