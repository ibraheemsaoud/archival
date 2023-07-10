import { useMutation, useQuery, useQueryClient } from "react-query";
import { Server } from "../config/server";
import api from "./apis";
import { Permission, Query, Role } from "appwrite";
import { ILink, ILinkCreate } from "../interfaces/timelineEntry.interface";
import { turnStringToValidTeamName } from "../helpers";

export const useRequestLinks = (eraId?: string) => {
  return useQuery<ILink[]>(
    ["links", eraId],
    async () =>
      (
        await api.listDocuments(Server.databaseID, Server.linkCollectionId, [
          Query.equal("eraId", [eraId!]),
        ])
      ).documents as ILink[],
    {
      enabled: !!eraId,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      initialData: undefined,
    }
  );
};

export const useRequestCreateLinks = () => {
  const queryClient = useQueryClient();
  return useMutation(async (link: ILinkCreate) => {
    const data = await api.createDocument(
      Server.databaseID,
      Server.linkCollectionId,
      { ...link },
      [
        Permission.read(Role.team(turnStringToValidTeamName(link.eraId))),
        Permission.update(Role.team(turnStringToValidTeamName(link.eraId))),
        Permission.delete(Role.team(turnStringToValidTeamName(link.eraId))),
      ]
    );
    queryClient.invalidateQueries(["links", link.eraId]);
    return data.documents;
  });
};
