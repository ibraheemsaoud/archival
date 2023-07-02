import { Server } from "../config/server";
import { Permission, Query, Role } from "appwrite";
import api from "./apis";
import { ILink, ILinkCreate } from "../interfaces/timelineEntry.interface";
import { turnStringToValidTeamName } from "../helpers";

export const requestLinks = async (eraId?: string) => {
  if (!eraId) {
    return {
      data: [] as ILink[],
      error: "No eraId",
    };
  }
  const data = await api.listDocuments(
    Server.databaseID,
    Server.linkCollectionId,
    [Query.equal("eraId", [eraId])]
  );
  if (data.documents) {
    return {
      data: data.documents as ILink[],
      error: undefined,
    };
  }
  return {
    data: [] as ILink[],
    error: "No data",
  };
};

export const requestCreateLink = async (link: ILinkCreate) => {
  if (!link) return { data: false, error: "No link" };
  try {
    const data = await api.createDocument(
      Server.databaseID,
      Server.linkCollectionId,
      { ...link },
      [
        Permission.read(Role.team(turnStringToValidTeamName(link.eraId))),
        Permission.update(Role.team(turnStringToValidTeamName(link.eraId))),
        Permission.delete(Role.team(turnStringToValidTeamName(link.eraId))),
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
