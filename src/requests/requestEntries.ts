import { Firestore, addDoc, collection, getDocs } from "firebase/firestore";
import { IEntry, IEntryCreate } from "../interfaces/entry.interface";

export const requestEntries = async (
  db: Firestore | null,
  topicId?: string,
  eraId?: string
) => {
  if (!db || !topicId || !eraId) {
    return {
      data: [],
      error: "No db or topicId or eraId",
    };
  }

  const entriesSnashot = await getDocs(
    collection(db, "Topics", topicId, "Era", eraId, "Entry")
  );

  const entries: IEntry[] = [];
  entriesSnashot.forEach((doc) => {
    const data = doc.data();
    entries.push({
      id: doc.id,
      link: data.link,
      title: data.title,
      text: data.text,
      timestamp: new Date(data.timestamp.seconds * 1000),
    });
  });

  return {
    data: entries,
    error: null,
  };
};

export const requestCreateEntry = async (
  db: Firestore | null,
  topicId: string,
  eraId: string,
  entry: IEntryCreate
) => {
  if (!db || !topicId || !eraId || !entry) return false;

  await addDoc(collection(db, "Topics", topicId, "Era", eraId, "Entry"), {
    link: entry.link,
    text: entry.text,
    timestamp: entry.timestamp,
    title: entry.title,
  } as IEntryCreate);
  return true;
};
