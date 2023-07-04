import { createContext, useContext, useEffect, useState } from "react";
import {
  requestLogin,
  requestLoginWithGoogle,
  requestLogout,
  requestUser,
  updateUserPrefs,
  verifyEmail,
} from "../requests";
import { Models } from "appwrite";
import { useRequestRegister } from "../requests/useRequestRegister";
import { VerifyEmailModal } from "./VerifyEmailModal";
import { VERIFICATION } from "../consts/links.const";

interface UserContext {
  user?: Models.User<any>;
  error?: string;
  logout: () => Promise<void>;
  signUpWithEmail: (email: string, password: string, name: string) => void;
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
  const [email, setEmail] = useState<string | undefined>(undefined);
  const [password, setPassword] = useState<string | undefined>(undefined);
  const [user, setUser] = useState<Models.User<any> | undefined>(undefined);
  const [error, setError] = useState<string | undefined>(undefined);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const {
    mutate: register,
    error: registrationError,
    data: registeredUser,
  } = useRequestRegister();

  useEffect(() => {
    if (registeredUser) {
      if (email && password) {
        loginWithPassword(email, password);
        setEmail(undefined);
        setPassword(undefined);
      }
      verifyEmail();
    }
    if (registrationError) {
      setError(registrationError as string);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [registeredUser, registrationError]);

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

  const loginWithPassword = async (email: string, password: string) => {
    const { error } = await requestLogin(email, password);
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

  const signUpWithEmail = (email: string, password: string, name: string) => {
    register({ email, password, name });
    setEmail(email);
    setPassword(password);
  };

  useEffect(() => {
    getUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.$id]);

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
      {user?.emailVerification === false &&
      window.location.pathname !== VERIFICATION ? (
        <VerifyEmailModal logout={logout} />
      ) : (
        children
      )}
    </userContext.Provider>
  );
};

export const useUser = () => {
  return useContext(userContext);
};
