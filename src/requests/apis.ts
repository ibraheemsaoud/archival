import { Client as Appwrite, Databases, Account, Models } from "appwrite";
import { Server } from "../config/server";

interface SDK {
  database: Databases;
  account: Account;
}

const api: {
  sdk: SDK | null;
  provider: () => SDK;
  createAccount: (
    email: string,
    password: string,
    name: string
  ) => Promise<Models.User<any>>;
  getAccount: () => Promise<Models.User<any>>;
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
  listDocuments: (
    databaseId: string,
    collectionId: string,
    queries?: string[]
  ) => Promise<Models.DocumentList<any>>;
  updateDocument: (
    databaseId: string,
    collectionId: string,
    documentId: string,
    data: any
  ) => Promise<Models.Document>;
  deleteDocument: (
    databaseId: string,
    collectionId: string,
    documentId: string
  ) => Promise<{}>;
} = {
  sdk: null,

  provider: () => {
    if (api.sdk) {
      return api.sdk;
    }
    let appwrite = new Appwrite();
    appwrite.setEndpoint(Server.endpoint).setProject(Server.project);
    const account = new Account(appwrite);
    const database = new Databases(appwrite);

    api.sdk = { database, account };
    return api.sdk;
  },

  createAccount: (email, password, name) => {
    return api.provider().account.create("unique()", email, password, name);
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
        "https://archivals.eu/",
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

  listDocuments: (databaseId, collectionId, queries) => {
    return api
      .provider()
      .database.listDocuments(databaseId, collectionId, queries);
  },

  updateDocument: (databaseId, collectionId, documentId, data) => {
    return api
      .provider()
      .database.updateDocument(databaseId, collectionId, documentId, data);
  },

  deleteDocument: (databaseId, collectionId, documentId) => {
    return api
      .provider()
      .database.deleteDocument(databaseId, collectionId, documentId);
  },
};

export default api;
