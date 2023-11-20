import { useMutation, useQuery } from "react-query";
import { Server } from "../config/server";
import api from "./apis";
import { ISeason, ISeasonCreate } from "../interfaces/season.interface";

export const useRequestSeason = (seasonId?: string) => {
  return useQuery<ISeason>(
    ["season", seasonId],
    async () => {
      const data = await api.getDocument(
        Server.databaseID,
        Server.seasonsCollectionId,
        seasonId!
      );
      if (data) {
        return data as ISeason;
      }
      throw new Error("Season not found");
    },
    {
      enabled: !!seasonId,
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
