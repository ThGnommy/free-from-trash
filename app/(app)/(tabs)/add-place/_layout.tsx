import { View, Text } from "react-native";
import React from "react";
import { Stack } from "expo-router";

export const unstable_settings = {
  initialRouteName: "index",
};

const AddPlaceLayout = () => {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: "Add Place" }} />
      <Stack.Screen name="place-preview" options={{ title: "Place Preview" }} />
    </Stack>
  );
};

export default AddPlaceLayout;
