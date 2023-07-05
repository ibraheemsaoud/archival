import { IEraCreate } from "../interfaces/era.interface";
import api from "./apis";
import { Server } from "../config/server";
import { Permission, Query, Role } from "appwrite";

export const requestEra = async (eraId?: string) => {
  if (!eraId)
    return {
      data: undefined,
      error: "no topic id provided",
    };
  const data = await api.listDocuments(
    Server.databaseID,
    Server.eraCollectionId,
    [Query.equal("id", [eraId])]
  );
  if (data.documents) {
    return {
      data: data.documents[0],
      error: undefined,
    };
  }
  return {
    data: undefined,
    error: "no era found",
  };
};

export const requestEras = async (topicId?: string) => {
  if (!topicId)
    return {
      data: undefined,
      error: "no topic id provided",
    };
  const data = await api.listDocuments(
    Server.databaseID,
    Server.eraCollectionId,
    [Query.equal("topicId", [topicId])]
  );
  if (data.documents) {
    return {
      data: data.documents,
      error: undefined,
    };
  }
  return {
    data: [],
    error: "no era found",
  };
};

export const requestCreateEra = async (topicId: string, era: IEraCreate) => {
  if (!topicId || !era) {
    return {
      data: undefined,
      error: "no topic id provided",
    };
  }
  const newEra = {
    ...era,
    isPublic: false,
    disableSuggestions: false,
    topicId,
  };
  try {
    const team = await api.createTeam(newEra.id);
    const data = await api.createDocument(
      Server.databaseID,
      Server.eraCollectionId,
      {
        ...newEra,
        topicId,
      },
      [
        Permission.read(Role.team(team.$id)),
        Permission.write(Role.team(team.$id)),
        Permission.delete(Role.team(team.$id)),
        Permission.update(Role.team(team.$id)),
      ]
    );
    return {
      data: data.documents,
      error: undefined,
    };
  } catch (error) {
    return {
      data: undefined,
      error: error as string,
    };
  }
};

export const requestDashboardEras = async () => {
  const data = await api.listDocuments(
    Server.databaseID,
    Server.eraCollectionId,
    [Query.limit(16), Query.orderDesc("$createdAt")]
  );
  if (data.documents) {
    return {
      data: data.documents,
      error: undefined,
    };
  }
  return {
    data: [],
    error: "no era found",
  };
};
