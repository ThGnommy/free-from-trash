import { useRouter, useSegments } from "expo-router";

import React, { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../firebaseInit";
import { signOut } from "firebase/auth";

interface IAuthContext {
  signIn: (newUser: object) => void;
  signOut: () => void;
  user: {};
}

const defaultState = {
  signIn: () => {},
  signOut: () => {},
  user: {},
};

const AuthContext = createContext<IAuthContext>(defaultState);

export function useAuth() {
  return useContext(AuthContext);
}

const useProtectedRoute = (user: {}) => {
  const segment = useSegments();
  const router = useRouter();

  useEffect(() => {
    const rootSegment = segment[0];
    // if the user doesn't exist and this route is not an auth route, push the user to sign-in screen
    if (user === null && rootSegment !== "(auth)") {
      router.replace("/sign-in");
    } else if (user !== null && rootSegment === "(auth)") {
      router.replace("(app)/");
    }
  }, [user, segment]);
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setAuth] = useState<any>(null);

  useProtectedRoute(user);

  const logout = async () => {
    try {
      await signOut(auth);
      setAuth(null);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  };

  return (
    <AuthContext.Provider
      value={{
        signIn: (newUser) => setAuth(newUser),
        signOut: logout,
        user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
