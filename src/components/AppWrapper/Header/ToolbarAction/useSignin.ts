import { useState } from "react";
import { useUser } from "../../../../hooks";

export const useSignin = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const { loginWithPassword, loginWithGoogle, signUpWithEmail } = useUser();

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleLoginEmailChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setLoginEmail(event.target.value);
  };

  const handleLoginPasswordChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setLoginPassword(event.target.value);
  };

  const handleSignInWithEmail = () => {
    loginWithPassword(loginEmail, loginPassword);
  };

  const handleSignInWithGoogle = () => {
    loginWithGoogle();
  };

  const handleSignUpWithEmail = () => {
    signUpWithEmail(email, password, name);
  };

  return {
    name,
    email,
    password,
    handleNameChange,
    handleEmailChange,
    handleSignInWithEmail,
    handlePasswordChange,
    handleSignInWithGoogle,
    handleSignUpWithEmail,
    loginEmail,
    loginPassword,
    handleLoginEmailChange,
    handleLoginPasswordChange,
  };
};
