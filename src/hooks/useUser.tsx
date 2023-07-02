import { createContext, useContext, useEffect, useState } from "react";
import {
  requestLogin,
  requestLoginWithGoogle,
  requestLogout,
  requestSignUp,
  requestUser,
  updateUserPrefs,
  verifyEmail,
} from "../requests";
import { Models } from "appwrite";

interface UserContext {
  user?: Models.User<any>;
  error?: string;
  logout: () => Promise<void>;
  signUpWithEmail: (
    email: string,
    password: string,
    name: string
  ) => Promise<void>;
  loginWithPassword: (username: string, password: string) => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  updatePrefs: (prefs: Models.Preferences) => Promise<void>;
  isLoading: boolean;
  isAdmin: boolean;
}
const userContext = createContext({
  user: undefined,
  error: undefined,
  logout: async () => {},
  signUpWithEmail: async (email: string, password: string, name: string) => {},
  loginWithPassword: async (username: string, password: string) => {},
  loginWithGoogle: async () => {},
  updatePrefs: async (prefs: Models.Preferences) => {},
  isLoading: false,
  isAdmin: false,
} as UserContext);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<Models.User<any> | undefined>(undefined);
  const [error, setError] = useState<string | undefined>(undefined);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const getUser = async () => {
    setIsLoading(true);
    const { data, error } = await requestUser();
    if (error) {
      setError(error);
    }
    if (data) {
      setUser(data);
    }
    setIsLoading(false);
  };

  const logout = async () => {
    const { error } = await requestLogout();
    if (error) {
      setError(error);
    } else {
      setUser(undefined);
    }
  };

  const loginWithPassword = async (username: string, password: string) => {
    const { error } = await requestLogin(username, password);
    if (error) {
      setError(error);
    } else {
      getUser();
    }
  };

  const loginWithGoogle = async () => {
    const { error } = await requestLoginWithGoogle();
    if (error) {
      setError(error);
    } else {
      getUser();
    }
  };

  const updatePrefs = async (prefs: Models.Preferences) => {
    const { error } = await updateUserPrefs(prefs);
    if (error) {
      setError(error);
    } else {
      getUser();
    }
  };

  const signUpWithEmail = async (
    email: string,
    password: string,
    name: string
  ) => {
    const { error } = await requestSignUp(email, password, name);
    if (error) {
      setError(error);
    } else {
      await loginWithPassword(email, password);
      verifyEmail();
      await updatePrefs({ displayName: name });
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  const isAdmin = user?.prefs.isAdmin === "true";

  return (
    <userContext.Provider
      value={{
        user,
        error,
        logout,
        signUpWithEmail,
        loginWithPassword,
        loginWithGoogle,
        updatePrefs,
        isLoading,
        isAdmin,
      }}
    >
      {children}
    </userContext.Provider>
  );
};

export const useUser = () => {
  return useContext(userContext);
};
