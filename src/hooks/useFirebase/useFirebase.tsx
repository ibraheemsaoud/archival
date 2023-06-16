import React, { createContext, useContext, useEffect, useState } from "react";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  getRedirectResult,
  isSignInWithEmailLink,
  signInWithEmailLink,
} from "firebase/auth";
import { firebaseConfig } from "./firebase.config";
import { useLocalStorage } from "../useLocalStorage";
// import { getFirestore } from "firebase/firestore";
// import { getAnalytics } from "firebase/analytics";

type User = {
  uid: string;
  email: string;
  displayName: string;
  photoURL: string;
};

type AuthContextValue = {
  user: User | null;
  isLoading: boolean;
  signOut: () => Promise<void>;
  firebaseAuth: ReturnType<typeof getAuth> | null;
};

export const AuthContext = createContext<AuthContextValue>({
  user: null,
  isLoading: true,
  signOut: async () => {},
  firebaseAuth: null,
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const app = initializeApp(firebaseConfig);

  const firebaseAuth = getAuth(app);
  // const firebaseFirestore = getFirestore(app);
  // const analytics = getAnalytics(app);

  const { getEmail, removeEmail } = useLocalStorage();

  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = firebaseAuth.onAuthStateChanged((firebaseUser) => {
      setUser(
        firebaseUser
          ? {
              uid: firebaseUser.uid,
              email: firebaseUser.email!,
              displayName: firebaseUser.displayName!,
              photoURL: firebaseUser.photoURL!,
            }
          : null
      );
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, [firebaseAuth]);

  useEffect(() => {
    if (!firebaseAuth) return;
    // TODO turn into await
    getRedirectResult(firebaseAuth)
      .then((result) => {
        if (!result) return;
        // This gives you a Google Access Token. You can use it to access Google APIs.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential?.accessToken;

        // The signed-in user info.
        const user = result.user;
        setUser({
          uid: user.uid,
          email: user.email!,
          displayName: user.displayName!,
          photoURL: user.photoURL!,
        });
        // IdP data available using getAdditionalUserInfo(result)
        console.log(token, user);
        // ...
      })
      .catch((error: any) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        console.error({
          errorCode,
          errorMessage,
          email,
          credential,
        });
      });
  }, [firebaseAuth]);

  useEffect(() => {
    console.log(isLoading, firebaseAuth.currentUser);
    if (
      !isLoading &&
      !firebaseAuth.currentUser &&
      isSignInWithEmailLink(firebaseAuth, window.location.href)
    ) {
      let email = getEmail();
      if (!email) {
        // User opened the link on a different device. To prevent session fixation
        // attacks, ask the user to provide the associated email again. For example:
        email = window.prompt("Please provide your email for confirmation");
      }
      // The client SDK will parse the code from the link for you.
      signInWithEmailLink(firebaseAuth, email || "", window.location.href)
        .then((result) => {
          removeEmail();
          console.log(result.user);
          console.log(result);
        })
        .catch((error) => {
          if (error.code === "auth/invalid-email") {
            removeEmail();
            window.location.reload();
          }
          console.error(error.code);
          console.error(email);
          console.error(error, email, firebaseAuth.currentUser);
        });
    }
  }, [firebaseAuth.currentUser, isLoading]);

  const signOut = async () => {
    removeEmail();
    firebaseAuth.signOut();
  };

  // Return the provider component with the auth context value
  return (
    <AuthContext.Provider value={{ user, isLoading, signOut, firebaseAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

// Create a custom hook to use the authentication context
export const useFirebase = () => useContext(AuthContext);
