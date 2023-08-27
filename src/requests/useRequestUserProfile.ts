import { useQuery } from "react-query";
import { Server } from "../config/server";
import { Client, Functions } from "appwrite";
import { IUserSimpleProfile } from "../interfaces/user.interface";

export const useRequestUserProfile = (userId: string) => {
  return useQuery<IUserSimpleProfile>(
    ["userProfile", userId],
    async () => {
      const client = new Client()
        .setEndpoint(Server.endpoint)
        .setProject(Server.project);
      const functions = new Functions(client);

      return JSON.parse(
        (
          await functions.createExecution(
            Server.userProfileFunctionId,
            JSON.stringify({ userId })
          )
        ).response
      ) as IUserSimpleProfile;
    },
    {
      enabled: !!userId,
      refetchOnMount: true,
      refetchOnWindowFocus: false,
      keepPreviousData: true,
      initialData: {
        displayName: "",
        imageURL: "",
      },
    }
  );
};
