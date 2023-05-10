import { View, Text } from "react-native";
import React from "react";
import { Stack } from "expo-router";
import { useTheme } from "react-native-magnus";

export const unstable_settings = {
  initialRouteName: "index",
};

const AddPlaceLayout = () => {
  const { theme } = useTheme();

  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: "Add Place",
          headerTitleAlign: "center",
          headerStyle: {
            backgroundColor: theme.colors?.darker,
          },
          headerTintColor: theme.colors?.primary,
        }}
      />
      <Stack.Screen
        name="place-preview"
        options={{
          title: "Place Preview",
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

export default AddPlaceLayout;
