import {
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import React from "react";
import { Stack, useRouter } from "expo-router";
import { Icon } from "react-native-magnus";

export const unstable_settings = {
  initialRouteName: "index",
};

const AppLayout = () => {
  const router = useRouter();

  return (
    <Stack>
      <Stack.Screen
        name="home"
        options={{
          title: "Place List",
          headerLeft: () => (
            <TouchableOpacity onPress={() => router.push("/settings")}>
              <Icon
                name="settings"
                color="black"
                fontFamily="Feather"
                fontSize={24}
              />
            </TouchableOpacity>
          ),
          headerRight: () => (
            <TouchableOpacity
            // onPress={() => router.push("/settings")}
            >
              <Icon
                name="map-pin"
                color="black"
                fontFamily="Feather"
                fontSize={24}
              />
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen
        name="settings"
        options={{
          title: "Settings",
          headerLeft: () => (
            <TouchableWithoutFeedback onPress={() => router.back()}>
              <Icon
                name="arrow-left"
                color="black"
                fontFamily="Feather"
                fontSize={24}
              />
            </TouchableWithoutFeedback>
          ),
        }}
      />
    </Stack>
  );
};

export default AppLayout;

const styles = StyleSheet.create({});
