import { IEntry, IEntryCreate } from "../interfaces/entry.interface";
import { Server } from "../config/server";
import { Permission, Query, Role } from "appwrite";
import api from "./apis";
import { turnStringToValidTeamName } from "../helpers";

export const requestEntries = async (eraId?: string) => {
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
      data: (data.documents as IEntry[]).map((entry) => ({
        ...entry,
        timestamp: new Date(entry.timestamp),
      })),
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
  if (!eraId || !entry) return { data: false, error: "No eraId or entry" };
  try {
    const data = await api.createDocument(
      Server.databaseID,
      Server.entryCollectionId,
      {
        ...entry,
        eraId,
        pictureUrl: entry.pictureUrl || undefined,
        link: entry.link || undefined,
      } as IEntry,
      [
        Permission.read(Role.team(turnStringToValidTeamName(eraId))),
        Permission.update(Role.team(turnStringToValidTeamName(eraId))),
        Permission.delete(Role.team(turnStringToValidTeamName(eraId))),
      ]
    );
    if (data.documents) {
      return true;
    }
  } catch (error) {
    return {
      data: false,
      error: error as string,
    };
  }
  return {
    data: false,
    error: "Something went wrong",
  };
};

export const requestEntry = async (entryId?: string) => {
  if (!entryId) {
    return {
      data: undefined,
      error: "No entryId",
    };
  }
  try {
    const data = await api.getDocument(
      Server.databaseID,
      Server.entryCollectionId,
      entryId
    );

    return {
      data: {
        ...data,
        timestamp: new Date(data.timestamp),
      },
      error: undefined,
    };
  } catch (error) {
    return {
      data: undefined,
      error: error as string,
    };
  }
};
