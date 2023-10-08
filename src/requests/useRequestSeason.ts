import { useMutation } from "react-query";
import { Server } from "../config/server";
import api from "./apis";
import { ISeasonCreate } from "../interfaces/season.interface";

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
