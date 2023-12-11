import { useMutation, useQuery } from "react-query";
import { Server } from "../config/server";
import api from "./apis";
import { ISeason, ISeasonCreate } from "../interfaces/season.interface";
import { Query } from "appwrite";

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
      throw new Error(
        "failed to load season, server might be down or you loaded the incorrect season"
      );
    },
    {
      enabled: !!slug,
      refetchOnMount: true,
      refetchOnWindowFocus: false,
      initialData: undefined,
    }
  );
};

export const useRequestCreateSeason = () => {
  return useMutation(["seasonList"], async (season: ISeasonCreate) => {
    const data = await api.createDocument(
      Server.databaseID,
      Server.seasonsCollectionId,
      season,
      []
    );
    return data;
  });
};
