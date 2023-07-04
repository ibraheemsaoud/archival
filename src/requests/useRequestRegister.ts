import { useMutation } from "react-query";
import { Server } from "../config/server";
import { Client, Functions, Models } from "appwrite";

export const useRequestRegister = () => {
  return useMutation(
    async ({
      email,
      password,
      name,
    }: {
      email: string;
      password: string;
      name: string;
    }) => {
      const client = new Client()
        .setEndpoint(Server.endpoint)
        .setProject(Server.project);
      const functions = new Functions(client);

      return JSON.parse(
        (
          await functions.createExecution(
            Server.registerFunctionId,
            JSON.stringify({
              email,
              password,
              name,
            })
          )
        ).response
      ) as Models.User<any>;
    }
  );
};
