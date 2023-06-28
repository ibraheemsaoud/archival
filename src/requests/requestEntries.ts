import { IEntry, IEntryCreate } from "../interfaces/entry.interface";
import { Server } from "../config/server";
import { Query } from "appwrite";
import api from "./apis";

export const requestEntries = async (
  eraId?: string
) => {
  if (!eraId) {
    return {
      data: [] as IEntry[],
      error: "No eraId",
    };
  }
  const data = await api.listDocuments(
    Server.databaseID,
    Server.entryCollectionId,
    [Query.equal("eraId", [eraId])]
  );
  if (data.documents) {
    return {
      data: data.documents as IEntry[],
      error: undefined,
    };
  }
  return {
    data: [] as IEntry[],
    error: "No data",
  };
};

export const requestCreateEntry = async (
  eraId: string,
  entry: IEntryCreate
) => {
  if (!eraId || !entry) return false;

  // await addDoc(collection(db, "Topics", topicId, "Era", eraId, "Entry"), {
  //   link: entry.link,
  //   text: entry.text,
  //   timestamp: entry.timestamp,
  //   title: entry.title,
  // } as IEntryCreate);
  return true;
};
