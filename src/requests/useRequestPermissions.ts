import { useQuery } from "react-query";
import { Server } from "../config/server";
import { Client, Functions } from "appwrite";
import { IPermissions } from "../interfaces/permissions.interface";

export const useRequestEraPermissions = (eraId?: string) => {
  return useQuery<IPermissions>(
    ["comments", eraId],
    async () => {
      const client = new Client()
        .setEndpoint(Server.endpoint)
        .setProject(Server.project);
      const functions = new Functions(client);

      const response = functions.createExecution(
        "64a31220b1c2d44e7e51",
        JSON.stringify({
          databaseId: Server.databaseID,
          collectionId: Server.eraCollectionId,
          eraId,
        })
      );
      return JSON.parse((await response).response) as IPermissions;
    },
    {
      enabled: !!eraId,
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
