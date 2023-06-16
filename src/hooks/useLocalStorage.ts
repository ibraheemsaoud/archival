export const useLocalStorage = () => {
  const setEmail = (email: string) => {
    window.localStorage.setItem("email", email);
  };
  const getEmail = () => {
    return window.localStorage.getItem("email");
  };
  const removeEmail = () => {
    window.localStorage.removeItem("email");
  };

  return {
    setEmail,
    getEmail,
    removeEmail,
  };
};
