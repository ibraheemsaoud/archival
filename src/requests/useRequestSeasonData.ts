import { useQuery } from "react-query";
import { Server } from "../config/server";
import { Client, Functions } from "appwrite";
import { ISeasonData } from "../interfaces/seasonData.interface";

export const useRequestSeasonData = (seasonId?: string) => {
  return useQuery<ISeasonData[]>(
    ["seasonData", seasonId],
    async () => {
      const client = new Client()
        .setEndpoint(Server.endpoint)
        .setProject(Server.project);
      const functions = new Functions(client);

      const response = await functions.createExecution(
        Server.seasonDataId,
        JSON.stringify({
          seasonId,
        })
      );
      return JSON.parse(response.response) as ISeasonData[];
    },
    {
      enabled: !!seasonId,
      refetchOnWindowFocus: false,
      initialData: []
    }
  );
};
