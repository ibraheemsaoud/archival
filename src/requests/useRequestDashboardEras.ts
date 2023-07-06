import { IEra } from "../interfaces/era.interface";
import { useQuery } from "react-query";
import api from "./apis";
import { Server } from "../config/server";
import { Query } from "appwrite";

export const useRequestDashboardEras = () => {
  return useQuery<IEra[]>(
    ["eras"],
    async () => {
      return (
        await api.listDocuments(Server.databaseID, Server.eraCollectionId, [
          Query.limit(12),
          Query.orderDesc("$createdAt"),
        ])
      ).documents as IEra[];
    },
    {
      refetchOnWindowFocus: true,
      refetchOnMount: true,
      refetchOnReconnect: true,
      staleTime: 1000 * 60 * 5,
    }
  );
};
