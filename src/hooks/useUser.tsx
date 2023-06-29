import { createContext, useContext, useEffect, useState } from "react";
import { requestLogin, requestLogout, requestUser } from "../requests";
import { Models } from "appwrite";

interface UserContext {
  user?: Models.User<any>;
  error?: string;
  logout: () => Promise<void>;
  login: (username: string, password: string) => Promise<void>;
  isLoading: boolean;
}
const userContext = createContext({
  user: undefined,
  error: undefined,
  logout: async () => {},
  login: async (username: string, password: string) => {},
  isLoading: false,
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

  const login = async (username: string, password: string) => {
    const { error } = await requestLogin(username, password);
    if (error) {
      setError(error);
    } else {
      getUser();
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <userContext.Provider
      value={{
        user,
        error,
        logout,
        login,
        isLoading,
      }}
    >
      {children}
    </userContext.Provider>
  );
};

export const useUser = () => {
  return useContext(userContext);
};
