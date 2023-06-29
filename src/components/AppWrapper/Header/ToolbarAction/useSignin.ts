import { useState } from "react";
import { useUser } from "../../../../hooks";

export const useSignin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useUser();

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleSignInWithEmail = async () => {
    login(email, password);
  };

  return {
    email,
    password,
    handleEmailChange,
    handleSignInWithEmail,
    handlePasswordChange,
  };
};
