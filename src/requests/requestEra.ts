import {
  Firestore,
  collection,
  doc,
  getDoc,
  getDocs,
} from "firebase/firestore";
import { IEra } from "../interfaces/era.interface";

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
        endDate: eraSnapshot.data().endDate
          ? new Date(eraSnapshot.data().endDate?.seconds * 1000)
          : undefined,
        isPublic: eraSnapshot.data().isPublic,
        allowSuggestions: eraSnapshot.data().allowSuggestions,
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

export const requestEras = async (db: Firestore | null, topicId?: string) => {
  if (!topicId || !db)
    return {
      data: undefined,
      error: "no topic id provided",
    };
  const erasSnashot = await getDocs(collection(db, "Topics", topicId, "Era"));
  const eras: IEra[] = [];
  erasSnashot.forEach((doc) => {
    eras.push({
      id: doc.id,
      title: doc.data().title,
      description: doc.data().description,
      creationDate: new Date(doc.data().creationDate?.seconds * 1000),
      ownerId: doc.data().ownerId,
      startDate: new Date(doc.data().startDate?.seconds * 1000),
      endDate: doc.data().endDate
        ? new Date(doc.data().endDate?.seconds * 1000)
        : undefined,
      isPublic: doc.data().isPublic,
      allowSuggestions: doc.data().allowSuggestions,
      coverImageUrl: doc.data().coverImageUrl,
    });
  });
  return {
    data: eras,
    error: undefined,
  };
};

export const useRequestCreateEra = () => {
  return {
    data: undefined,
    isLoading: false,
    error: undefined,
    mutate: (data: Partial<IEra>) => {
      // list.push({
      //   ...data,
      //   slug: data.title?.replace(/\s/g, "-"),
      //   id: Math.random().toString(),
      //   creationDate: new Date(),
      //   starDate: new Date(),
      //   endDate: new Date(),
      //   isPublic: true,
      // } as IEra);
    },
  };
};
