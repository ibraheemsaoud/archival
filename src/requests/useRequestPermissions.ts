import { useQuery } from "react-query";
import { Server } from "../config/server";
import { Client, Functions } from "appwrite";
import { IPermissions } from "../interfaces/permissions.interface";
import { useUser } from "../hooks";
import { turnStringToValidTeamName } from "../helpers";

export const useRequestPermissions = (
  collectionId?: string,
  eraId?: string,
  documentId?: string
) => {
  const { user } = useUser();
  return useQuery<IPermissions>(
    ["eraPermissions", eraId, user?.$id, collectionId, documentId],
    async () => {
      const client = new Client()
        .setEndpoint(Server.endpoint)
        .setProject(Server.project);
      const functions = new Functions(client);

      const response = await functions.createExecution(
        Server.permissionFunctionId,
        JSON.stringify({
          databaseId: Server.databaseID,
          collectionId,
          teamName: eraId ? turnStringToValidTeamName(eraId!) : undefined,
          documentId,
        })
      );
      return JSON.parse(response.response).permissions as IPermissions;
    },
    {
      enabled: !!collectionId && !!user?.$id,
      refetchOnWindowFocus: false,
      initialData: {
        read: false,
        create: false,
        update: false,
        delete: false,
      },
    }
  );
};
