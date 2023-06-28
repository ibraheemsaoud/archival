import { doc, getDoc, Firestore } from "firebase/firestore";
import api from "./apis";
import { Server } from "../config/server";

export const requestTopics = async () => {
  const data = await api.listDocuments(
    Server.databaseID,
    Server.topicCollectionId
  );
  if (data.documents) {
    return {
      data: data.documents,
      error: undefined,
    };
  }
  return {
    data: [],
    error: "failed to load topics, server might be down",
  };
};

export const requestTopic = async (db: Firestore | null, id?: string) => {
  if (!id || !db)
    return {
      data: undefined,
      error: "no id provided",
    };
  const topicSnapshot = await getDoc(doc(db, "Topics", id));
  if (topicSnapshot.exists()) {
    return {
      data: {
        id: topicSnapshot.id,
        title: topicSnapshot.data().title,
        description: topicSnapshot.data().description,
      },
      error: undefined,
    };
  } else {
    return {
      data: undefined,
      error:
        "failed to load topic, server might be down or you loaded the incorrect topic",
    };
  }
};
