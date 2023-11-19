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
