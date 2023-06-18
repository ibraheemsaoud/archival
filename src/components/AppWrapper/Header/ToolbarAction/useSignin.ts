import { useState } from "react";
import { sendSignInLinkToEmail, signInWithRedirect } from "firebase/auth";
import {
  useFirebase,
  useLocalStorage,
  GoogleProvider,
} from "../../../../hooks";
import jsonPackage from "../../../../../package.json";

export const useSignin = () => {
  const [emailSent, setEmailSent] = useState(false);
  const [email, setEmail] = useState("");
  const { firebaseAuth } = useFirebase();
  const { setEmail: setLSEmail } = useLocalStorage();

  const signInWithEmail = (email: string) => {
    if (!firebaseAuth) return undefined;
    return sendSignInLinkToEmail(firebaseAuth, email, {
      url: jsonPackage.homepage,
      handleCodeInApp: true,
    });
  };

  const signInWithGoogle = async () => {
    if (!firebaseAuth) return undefined;
    signInWithRedirect(firebaseAuth, GoogleProvider);
  };

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handleSignInWithEmail = async () => {
    try {
      setLSEmail(email);
      await signInWithEmail(email);
      setEmailSent(true);
    } catch (error) {
      console.error(error);
    }
  };

  return {
    email,
    handleEmailChange,
    handleSignInWithEmail,
    signInWithGoogle,
    emailSent,
  };
};
