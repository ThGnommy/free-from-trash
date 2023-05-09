import { View, Text } from "react-native";
import React from "react";
import { Stack } from "expo-router";
import { useTheme } from "react-native-magnus";

export const unstable_settings = {
  initialRouteName: "(tabs)",
};

const AppLayout = () => {
  const { theme } = useTheme();

  return (
    <Stack>
      <Stack.Screen
        name="(tabs)"
        options={{ headerShown: false, headerTitleAlign: "center" }}
      />
      <Stack.Screen
        name="camera"
        options={{ headerShown: false, headerTitleAlign: "center" }}
      />
      <Stack.Screen
        name="[place]"
        options={{
          title: "Place",
          headerBackTitle: "Home",
          headerTitleAlign: "center",
          headerStyle: {
            backgroundColor: theme.colors?.darker,
          },
          headerTintColor: theme.colors?.primary,
        }}
      />
    </Stack>
  );
};

export default AppLayout;
