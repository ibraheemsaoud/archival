import api from "./apis";
import { Server } from "../config/server";
import { Query } from "appwrite";
import { IFashionWeek } from "../interfaces/fashionWeek.interface";
import { ISeason } from "../interfaces/season.interface";

export const requestFashionWeeks = async () => {
  const data = await api.listDocuments(
    Server.databaseID,
    Server.fashionWeeksCollectionId,
    [Query.equal("isPublic", [true]), Query.limit(5)]
  );
  if (data.documents?.length > 0) {
    data.documents.map((fashionWeek: IFashionWeek) => {
      // turn seasons to an array if it is an object
      if(fashionWeek.seasons && !Array.isArray(fashionWeek.seasons)) {
        fashionWeek.seasons = [fashionWeek.seasons as any as ISeason];
      }
      return fashionWeek;
    });
    return {
      data: data.documents as IFashionWeek[],
      error: undefined,
    };
  }
  return {
    data: undefined,
    error:
      "failed to load fashion weeks, server might be down",
  };
};
