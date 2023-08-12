import api from "./apis";
import { Server } from "../config/server";
import { Query } from "appwrite";
import { IBrand } from "../interfaces/brand.interface";

export const requestBrands = async () => {
  const data = await api.listDocuments(
    Server.databaseID,
    Server.brandsCollectionId
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

export const requestBrand = async (id?: string) => {
  if (!id)
    return {
      data: undefined,
      error: "no id provided",
    };
  const data = await api.listDocuments(
    Server.databaseID,
    Server.brandsCollectionId,
    [Query.equal("id", [id])]
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
