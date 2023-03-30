import { useRouter, useSegments } from "expo-router";
import React, { createContext, useContext, useEffect, useState } from "react";

interface IAuthContext {
  signIn: () => void;
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
    if (!user && rootSegment !== "(auth)") {
      router.replace("/sign-in");
    } else if (user && rootSegment === "(auth)") {
      router.replace("/");
    }
  }, [user, segment]);
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setAuth] = useState<any>(null);

  useProtectedRoute(user);

  return (
    <AuthContext.Provider
      value={{
        signIn: () => setAuth({ user: "it's meee" }),
        signOut: () => setAuth(null),
        user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
