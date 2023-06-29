import { useState } from "react";
import {
  useLocalStorage,
} from "../../../../hooks";
import { requestLogin } from "../../../../requests";

export const useSignin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const {} = useLocalStorage();

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleSignInWithEmail = async () => {
    try {
      await requestLogin(email, password);
    } catch (error) {
      console.error(error);
    }
  };

  return {
    email,
    password,
    handleEmailChange,
    handleSignInWithEmail,
    handlePasswordChange
  };
};
