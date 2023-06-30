import { IEra, IEraCreate } from "../interfaces/era.interface";
import api from "./apis";
import { Server } from "../config/server";
import { Permission, Query, Role } from "appwrite";
import { turnStringToValidTeamName } from "../helpers";

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
  const newEra: IEra = {
    ...era,
    isPublic: false,
    disableSuggestions: false,
    topicId,
  };
  try {
    const data = await api.createDocument(
      Server.databaseID,
      Server.eraCollectionId,
      {
        ...newEra,
        topicId,
      },
      [
        Permission.read(Role.team(turnStringToValidTeamName(newEra.id))),
        Permission.write(Role.team(turnStringToValidTeamName(newEra.id))),
        Permission.delete(Role.team(turnStringToValidTeamName(newEra.id))),
        Permission.update(Role.team(turnStringToValidTeamName(newEra.id))),
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

export const requestUpdateEra = async (topicId: string, era: IEra) => {
  if (!topicId || !era) return false;
  // await setDoc(doc(db, "Topics", topicId, "Era", era.id), {
  //   ...era,
  // });
  return true;
};
