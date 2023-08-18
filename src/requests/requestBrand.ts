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

export const requestBrand = async (slug?: string) => {
  if (!slug)
    return {
      data: undefined,
      error: "no slug provided",
    };
  const data = await api.listDocuments(
    Server.databaseID,
    Server.brandsCollectionId,
    [Query.equal("slug", [slug]), Query.equal("isPublic", [true])]
  );
  if (data.documents?.length > 0) {
    return {
      data: data.documents[0] as IBrand,
      error: undefined,
    };
  }
  return {
    data: undefined,
    error:
      "failed to load brand, server might be down or you loaded the incorrect brand",
  };
};
