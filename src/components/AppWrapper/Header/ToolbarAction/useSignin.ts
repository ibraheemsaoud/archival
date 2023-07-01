import { useState } from "react";
import { useUser } from "../../../../hooks";

export const useSignin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { loginWithPassword, loginWithGoogle } = useUser();

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleSignInWithEmail = () => {
    loginWithPassword(email, password);
  };

  const handleSignInWithGoogle = () => {
    loginWithGoogle();
  };

  return {
    email,
    password,
    handleEmailChange,
    handleSignInWithEmail,
    handlePasswordChange,
    handleSignInWithGoogle,
  };
};
