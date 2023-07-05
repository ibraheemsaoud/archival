import { useMutation, useQuery, useQueryClient } from "react-query";
import { IEra } from "../interfaces/era.interface";
import { Server } from "../config/server";
import api from "./apis";
import { Permission, Role } from "appwrite";

export const useRequestEra = (eraId?: string) => {
  return useQuery<IEra>(
    ["era", eraId],
    async () =>
      (await api.getDocument(
        Server.databaseID,
        Server.eraCollectionId,
        eraId!
      )) as IEra,
    {
      enabled: !!eraId,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      initialData: undefined,
    }
  );
};

export const useRequestUpdateEra = () => {
  const queryClient = useQueryClient();
  return useMutation(async (era: IEra) => {
    const newEra = {
      accentColor: era.accentColor,
      coverImageUrl: era.coverImageUrl,
      description: era.description,
      disableSuggestions: era.disableSuggestions,
      id: era.id,
      isPublic: era.isPublic,
      title: era.title,
      topicId: era.topicId,
      $permissions: era.isPublic
        ? [...era.$permissions, Permission.read(Role.any())]
        : era.$permissions.filter((p) => p !== Permission.read(Role.any())),
    };
    const response = await api.updateDocument(
      Server.databaseID,
      Server.eraCollectionId,
      era.$id,
      newEra,
      newEra.$permissions
    );
    queryClient.invalidateQueries(["era", era.$id]);
    return response;
  });
};
