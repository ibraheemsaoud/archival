import { useState } from "react";
import { requestLogout, requestUser } from "../requests";
import { Models } from "appwrite";

export const useUser = () => {
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

  return {
    user,
    error,
    getUser,
    logout,
    isLoading,
  };
};
