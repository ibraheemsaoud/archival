import { useMutation } from "react-query";
import { Server } from "../config/server";
import { Client, Functions, Models } from "appwrite";

export const useRequestMainPageEntries = () => {
  return useMutation(async () => {
    const client = new Client()
      .setEndpoint(Server.endpoint)
      .setProject(Server.project);
    const functions = new Functions(client);

    return JSON.parse(
      (await functions.createExecution(Server.mainPageEntriesFunctionId)).response
    ) as Models.User<any>;
  });
};
