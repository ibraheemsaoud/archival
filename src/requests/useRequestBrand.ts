import { useQuery } from "react-query";
import { Server } from "../config/server";
import api from "./apis";
import { Query } from "appwrite";
import { IBrand } from "../interfaces/brand.interface";

export const useRequestBrand = (slug?: string) => {
  return useQuery<IBrand>(
    ["brand", slug],
    async () => {
      const data = await api.listDocuments(
        Server.databaseID,
        Server.brandsCollectionId,
        [Query.equal("slug", [slug!])]
      );
      if (data.documents?.length > 0) {
        return data.documents[0] as IBrand;
      }
      throw new Error("Season not found");
    },
    {
      enabled: !!slug,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      initialData: undefined,
    }
  );
};
