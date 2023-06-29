import { IEra, IEraCreate } from "../interfaces/era.interface";
import api from "./apis";
import { Server } from "../config/server";
import { Query } from "appwrite";

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

export const requestCreateEra = async (
  topicId: string,
  era: IEraCreate
) => {
  if (!topicId || !era) return false;
  // await setDoc(doc(db, "Topics", topicId, "Era", era.id), {
  //   title: era.title,
  //   ownerId: era.ownerId,
  //   description: era.description,
  //   creationDate: new Date(),
  //   isPublic: false,
  //   disableSuggestions: false,
  //   startDate: new Date(),
  //   coverImageUrl: era.coverImageUrl,
  // } as IEra);
  return true;
};

export const requestUpdateEra = async (
  topicId: string,
  era: IEra
) => {
  if (!topicId || !era) return false;
  // await setDoc(doc(db, "Topics", topicId, "Era", era.id), {
  //   ...era,
  // });
  return true;
};
