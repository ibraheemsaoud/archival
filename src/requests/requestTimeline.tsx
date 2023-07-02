import {
  ITimelineEntry,
  ITimelineEntryCreate,
} from "../interfaces/timelineEntry.interface";
import api from "./apis";
import { Server } from "../config/server";
import { Permission, Query, Role } from "appwrite";
import { turnStringToValidTeamName } from "../helpers";

export const requestTimeline = async (eraId?: string) => {
  if (!eraId) {
    return {
      data: [] as ITimelineEntry[],
      error: "No eraId",
    };
  }
  const data = await api.listDocuments(
    Server.databaseID,
    Server.timelineEntryCollectionId,
    [Query.equal("EraId", [eraId]), Query.orderAsc("order")]
  );
  if (data.documents) {
    return {
      data: data.documents as ITimelineEntry[],
      error: undefined,
    };
  }
  return {
    data: [] as ITimelineEntry[],
    error: "No data",
  };
};

export const requestCreateTimelineEntry = async (
  eraId: string,
  entry: ITimelineEntryCreate
) => {
  if (!eraId || !entry)
    return {
      error: "No eraId or entry",
      data: undefined,
    };

  try {
    await api.createDocument(
      Server.databaseID,
      Server.timelineEntryCollectionId,
      entry,
      [
        Permission.read(Role.any()),
        Permission.write(Role.team(turnStringToValidTeamName(eraId))),
        Permission.delete(Role.team(turnStringToValidTeamName(eraId))),
        Permission.update(Role.team(turnStringToValidTeamName(eraId))),
      ]
    );
    return {
      error: undefined,
      data: true,
    };
  } catch (e) {
    return {
      error: e as string,
      data: undefined,
    };
  }
};

export const requestUpdateTimelineEntry = async (
  eraId: string,
  entry: ITimelineEntry
) => {
  if (!eraId || !entry)
    return {
      error: "No eraId or entry",
      data: undefined,
    };

  const { $id, $collectionId, $createdAt, $databaseId, $updatedAt, ...rest } =
    entry;

  try {
    await api.updateDocument(
      Server.databaseID,
      Server.timelineEntryCollectionId,
      entry.$id,
      rest
    );
    return {
      error: undefined,
      data: true,
    };
  } catch (e) {
    return {
      error: e as string,
      data: undefined,
    };
  }
};

export const requestDeleteTimelineEntry = async (
  eraId: string,
  entry: ITimelineEntry
) => {
  if (!eraId || !entry)
    return {
      error: "No eraId or entry",
      data: undefined,
    };

  try {
    await api.deleteDocument(
      Server.databaseID,
      Server.timelineEntryCollectionId,
      entry.$id
    );
    return {
      error: undefined,
      data: true,
    };
  } catch (e) {
    return {
      error: e as string,
      data: undefined,
    };
  }
};
