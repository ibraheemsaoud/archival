import { useRequsetUser } from "../requests";

export const useUser = () => {
  const { data: user } = useRequsetUser();
  const isLoggedIn = !!user;
  return { user, isLoggedIn };
};
