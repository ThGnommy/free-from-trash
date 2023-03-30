import { Stack } from "expo-router";

const RootLayoutNav = () => {
  return (
    <Stack>
      <Stack.Screen name="sign-in" options={{ title: "Sign In" }} />
    </Stack>
  );
};

export default RootLayoutNav;
