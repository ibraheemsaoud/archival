import { Firestore, doc, getDoc, setDoc } from "firebase/firestore";
import { IEra, IEraCreate } from "../interfaces/era.interface";
import api from "./apis";
import { Server } from "../config/server";
import { Query } from "appwrite";

export const requestEra = async (
  db: Firestore | null,
  topicId?: string,
  eraId?: string
) => {
  if (!topicId || !db || !eraId)
    return {
      data: undefined,
      error: "no topic id provided",
    };

  const eraRef = doc(db, "Topics", topicId, "Era", eraId);
  const eraSnapshot = await getDoc(eraRef);
  if (eraSnapshot.exists()) {
    return {
      data: {
        id: eraSnapshot.id,
        title: eraSnapshot.data().title,
        description: eraSnapshot.data().description,
        creationDate: new Date(eraSnapshot.data().creationDate.seconds * 1000),
        ownerId: eraSnapshot.data().ownerId,
        startDate: new Date(eraSnapshot.data().startDate.seconds * 1000),
        isPublic: eraSnapshot.data().isPublic,
        disableSuggestions: eraSnapshot.data().disableSuggestions,
        coverImageUrl: eraSnapshot.data().coverImageUrl,
      },
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
  const data = await await api.listDocuments(
    Server.databaseID,
    Server.eraCollectionId,
    [Query.equal("topicId", [topicId])]
  );
  console.log(data, topicId);
  if (data.documents) {
    return {
      data: data.documents,
      error: undefined,
    };
  }
  return {
    data: [],
    error: undefined,
  };
};

export const requestCreateEra = async (
  db: Firestore | null,
  topicId: string,
  era: IEraCreate
) => {
  if (!db || !topicId || !era) return false;
  await setDoc(doc(db, "Topics", topicId, "Era", era.id), {
    title: era.title,
    ownerId: era.ownerId,
    description: era.description,
    creationDate: new Date(),
    isPublic: false,
    disableSuggestions: false,
    startDate: new Date(),
    coverImageUrl: era.coverImageUrl,
  } as IEra);
  return true;
};

export const requestUodateEra = async (
  db: Firestore | null,
  topicId: string,
  era: IEra
) => {
  if (!db || !topicId || !era) return false;
  await setDoc(doc(db, "Topics", topicId, "Era", era.id), {
    ...era,
  });
  return true;
};
