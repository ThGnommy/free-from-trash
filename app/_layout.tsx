import { ThemeProvider, ThemeType } from "react-native-magnus";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { DarkTheme, DefaultTheme } from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Slot, SplashScreen } from "expo-router";
import { useEffect } from "react";
import { useColorScheme } from "react-native";
import { AuthProvider, useAuth } from "../context/Auth";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebaseInit";

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: "index",
};

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  return (
    <>
      {/* Keep the splash screen open until the assets have loaded. In the future, we should just support async font loading with a native version of font-display. */}
      {!loaded && <SplashScreen />}
      {loaded && <RootLayoutNav />}
    </>
  );
}

function RootLayoutNav() {
  const colorScheme = useColorScheme();

  const { signIn, user } = useAuth();

  // type ThemeProps<T> = {
  //   [name: string]: T;
  // };

  const theme = {
    colors: {
      google: "#4285F4",
    },
  };

  return (
    <>
      <ThemeProvider theme={theme}>
        <AuthProvider>
          <Slot />
        </AuthProvider>
      </ThemeProvider>
    </>
  );
}
