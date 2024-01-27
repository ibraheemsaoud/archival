import { useQuery } from "react-query";
import { Server } from "../config/server";
import api from "./apis";
import { Query } from "appwrite";
import { IFashionWeek } from "../interfaces/fashionWeek.interface";

export const useRequestFashionWeek = (fashionWeekId?: string) => {
  return useQuery<IFashionWeek>(
    ["fashionWeek", fashionWeekId],
    async () => {
      const data = await api.listDocuments(
        Server.databaseID,
        Server.fashionWeeksCollectionId,
        [Query.equal("slug", [fashionWeekId!]), Query.equal("isPublic", [true])]
      );
      if (data.documents?.length > 0) {
        return data.documents[0] as IFashionWeek;
      }
      throw new Error(
        "failed to load fashion week, server might be down or you loaded the incorrect brand"
      );
    },
    {
      enabled: !!fashionWeekId,
      refetchOnMount: true,
      refetchOnWindowFocus: false,
      initialData: undefined,
    }
  );
};
