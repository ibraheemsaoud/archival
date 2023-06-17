import {
  doc,
  collection,
  getDocs,
  getDoc,
  Firestore,
} from "firebase/firestore";
import { ITopic } from "../interfaces/topic.interface";

export const requestTopics = async (db: Firestore | null) => {
  if (!db)
    return {
      data: [],
      error: "no db provided",
    };
  const topicsSnapshot = await getDocs(collection(db, "Topics"));
  if (topicsSnapshot?.docs?.length > 0) {
    let topics: ITopic[] = [];
    topicsSnapshot.docs.forEach((doc) => {
      const docData = doc.data();
      topics.push({
        id: doc.id,
        title: docData.title,
        description: docData.description,
      });
    });
    return {
      data: topics,
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
