import { useQuery } from "react-query";
import { Server } from "../config/server";
import api from "./apis";
import { Query } from "appwrite";
import { ISeason } from "../interfaces/season.interface";

export const useRequestSeason = (slug?: string) => {
  return useQuery<ISeason>(
    ["season", slug],
    async () => {
      const data = await api.listDocuments(
        Server.databaseID,
        Server.seasonsCollectionId,
        [Query.equal("slug", [slug!]), Query.equal("isPublic", [true])]
      );
      if (data.documents?.length > 0) {
        return data.documents[0] as ISeason;
      }
      // eslint-disable-next-line no-throw-literal
      throw "Season not found";
    },
    {
      enabled: !!slug,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      initialData: undefined,
    }
  );
};
