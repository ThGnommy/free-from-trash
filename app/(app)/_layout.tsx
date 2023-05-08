import { View, Text } from "react-native";
import React from "react";
import { Stack } from "expo-router";

export const unstable_settings = {
  initialRouteName: "(tabs)",
};

const AppLayout = () => {
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="camera" options={{ headerShown: false }} />
      <Stack.Screen
        name="[place]"
        options={{ title: "Place", headerBackTitle: "Home" }}
      />
    </Stack>
  );
};

export default AppLayout;
