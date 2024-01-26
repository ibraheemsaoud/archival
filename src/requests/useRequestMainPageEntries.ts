import { useMutation } from "react-query";
import { Server } from "../config/server";
import { Client, Functions } from "appwrite";
import { IMainPageEntries } from "../interfaces/mainPageEntries.interface";

export const useRequestMainPageEntries = () => {
  return useMutation(async () => {
    const client = new Client()
      .setEndpoint(Server.endpoint)
      .setProject(Server.project);
    const functions = new Functions(client);

    try {
      return JSON.parse(
        (await functions.createExecution(Server.mainPageEntriesFunctionId))
          .response
      ) as IMainPageEntries;
    } catch (error) {
      console.error(error);
      return [] as IMainPageEntries;
    }
  });
};
