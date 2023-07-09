import {
  Client as Appwrite,
  Databases,
  Account,
  Models,
  Teams,
  ID,
  Storage,
} from "appwrite";
import { Server } from "../config/server";
import { turnStringToValidTeamName } from "../helpers";

interface SDK {
  database: Databases;
  account: Account;
  teams: Teams;
  storage: Storage;
}

interface Api {
  sdk: SDK | null;
  provider: () => SDK;
  createAccount: (
    email: string,
    password: string,
    name: string
  ) => Promise<Models.User<any>>;
  getAccount: () => Promise<Models.User<any>>;
  verifyEmail: () => void;
  updateVerification: (userId: string, secret: string) => void;
  updateAccountPrefs: (prefs: Models.Preferences) => Promise<Models.User<any>>;
  createEmailSession: (
    email: string,
    password: string
  ) => Promise<Models.Session>;
  createGoogleSession: () => void | URL;
  deleteCurrentSession: () => Promise<{}>;
  createDocument: (
    databaseId: string,
    collectionId: string,
    data: any,
    permissions: any
  ) => Promise<Models.Document>;
  getDocument: (
    databaseId: string,
    collectionId: string,
    documentId: string
  ) => Promise<Models.Document>;
  listDocuments: (
    databaseId: string,
    collectionId: string,
    queries?: string[]
  ) => Promise<Models.DocumentList<any>>;
  updateDocument: (
    databaseId: string,
    collectionId: string,
    documentId: string,
    data: any,
    permissions?: any
  ) => Promise<Models.Document>;
  deleteDocument: (
    databaseId: string,
    collectionId: string,
    documentId: string
  ) => Promise<{}>;
  createTeam: (name: string) => Promise<Models.Team<any>>;
  uploadFile: (
    bucketId: string,
    fileName: string,
    file: File
  ) => Promise<Models.File>;
}

const api: Api = {
  sdk: null,

  provider: () => {
    if (api.sdk) {
      return api.sdk;
    }
    let appwrite = new Appwrite();
    appwrite.setEndpoint(Server.endpoint).setProject(Server.project);
    const account = new Account(appwrite);
    const database = new Databases(appwrite);
    const teams = new Teams(appwrite);
    const storage = new Storage(appwrite);

    api.sdk = { database, account, teams, storage };
    return api.sdk;
  },

  createAccount: (email, password, name) => {
    return api.provider().account.create("unique()", email, password, name);
  },

  verifyEmail: () => {
    return api
      .provider()
      .account.createVerification("https://archivals.eu/verification");
  },

  updateVerification: (userId, secret) => {
    return api.provider().account.updateVerification(userId, secret);
  },

  updateAccountPrefs: (prefs) => {
    return api.provider().account.updatePrefs(prefs);
  },

  getAccount: () => {
    let account = api.provider().account;
    return account.get();
  },

  createEmailSession: (email, password) => {
    return api.provider().account.createEmailSession(email, password);
  },

  createGoogleSession: () => {
    return api
      .provider()
      .account.createOAuth2Session(
        "google",
        window.location.href,
        "https://archivals.eu/"
      );
  },

  deleteCurrentSession: () => {
    return api.provider().account.deleteSession("current");
  },

  createDocument: (databaseId, collectionId, data, permissions) => {
    return api
      .provider()
      .database.createDocument(
        databaseId,
        collectionId,
        "unique()",
        data,
        permissions
      );
  },

  getDocument: (databaseId, collectionId, documentId) => {
    return api
      .provider()
      .database.getDocument(databaseId, collectionId, documentId);
  },

  listDocuments: (databaseId, collectionId, queries) => {
    return api
      .provider()
      .database.listDocuments(databaseId, collectionId, queries);
  },

  updateDocument: (databaseId, collectionId, documentId, data, permissions) => {
    if (permissions) {
      return api
        .provider()
        .database.updateDocument(
          databaseId,
          collectionId,
          documentId,
          data,
          permissions
        );
    }
    return api
      .provider()
      .database.updateDocument(databaseId, collectionId, documentId, data);
  },

  deleteDocument: (databaseId, collectionId, documentId) => {
    return api
      .provider()
      .database.deleteDocument(databaseId, collectionId, documentId);
  },

  createTeam: (name: string) => {
    return api
      .provider()
      .teams.create(ID.unique(), turnStringToValidTeamName(name));
  },

  uploadFile: (bucketId: string, fileName: string, file: File) => {
    return api.provider().storage.createFile(bucketId, fileName, file);
  }
};

export default api;
