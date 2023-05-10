import { Stack } from "expo-router";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { auth } from "../../firebaseInit";
import { useAuth } from "../../context/Auth";

const RootLayoutNav = () => {
  const { signIn } = useAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        // ...
        signIn(currentUser);
      } else {
        // User is signed out
        // ...
      }
    });

    return unsubscribe;
  }, []);

  return (
    <Stack>
      <Stack.Screen
        name="sign-in"
        options={{
          headerShown: false,
          animation: "fade",
          animationDuration: 1000,
        }}
      />
      <Stack.Screen
        name="login"
        options={{
          headerShown: false,
          animation: "fade",
          animationDuration: 1000,
        }}
      />
    </Stack>
  );
};

export default RootLayoutNav;
