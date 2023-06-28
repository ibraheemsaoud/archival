import api from "./apis";
import { Server } from "../config/server";
import { Query } from "appwrite";

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

export const requestTopic = async (id?: string) => {
  if (!id)
    return {
      data: undefined,
      error: "no id provided",
    };
  const data = await api.listDocuments(
    Server.databaseID,
    Server.topicCollectionId,
    [Query.equal("id", [id])]
  );
  if (data.documents?.length > 0) {
    return {
      data: data.documents[0],
      error: undefined,
    };
  }
  return {
    data: undefined,
    error:
      "failed to load topic, server might be down or you loaded the incorrect topic",
  };
};
