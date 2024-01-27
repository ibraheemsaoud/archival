import { useQuery } from "react-query";
import { Server } from "../config/server";
import api from "./apis";
import { Query } from "appwrite";
import { IBrand } from "../interfaces/brand.interface";

export const useRequestBrand = (brandId: string) => {
  return useQuery<IBrand>(
    ["brand", brandId],
    async () => {
      const data = await api.listDocuments(
        Server.databaseID,
        Server.brandsCollectionId,
        [Query.equal("slug", [brandId]), Query.equal("isPublic", [true])]
      );
      if (data.documents?.length > 0) {
        return data.documents[0] as IBrand;
      }
      throw new Error(
        "failed to load brand, server might be down or you loaded the incorrect brand"
      );
    },
    {
      enabled: !!brandId,
      refetchOnMount: true,
      refetchOnWindowFocus: false,
      initialData: undefined,
    }
  );
};

export const useRequestBrandList = (brandIdQuery?: string) => {
  return useQuery<IBrand[]>(
    ["brand-list", brandIdQuery],
    async () => {
      const queries = [Query.equal("isPublic", [true])]
      if (brandIdQuery) {
        queries.push(Query.search("name", brandIdQuery))
      }
      const data = await api.listDocuments(
        Server.databaseID,
        Server.brandsCollectionId,
        queries,
      );
      if (data.documents?.length > 0) {
        return data.documents as IBrand[];
      }
      throw new Error(
        "failed to load brand list, server might be down or you loaded the incorrect brand"
      );
    },
    {
      refetchOnMount: true,
      refetchOnWindowFocus: false,
      initialData: [] as IBrand[],
    }
  );
};
