import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Stack } from "expo-router";

export const unstable_settings = {
  initialRouteName: "index",
};

const AppLayout = () => {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: "Home" }} />
    </Stack>
  );
};

export default AppLayout;

const styles = StyleSheet.create({});
