import {
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";
import React from "react";
import { Stack, useRouter } from "expo-router";
import { Div, Icon } from "react-native-magnus";

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

          headerShadowVisible: false,
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
            <Div row style={{ gap: 10 }}>
              <TouchableWithoutFeedback
                onPress={() => router.push("leaderboard")}
              >
                <Icon
                  name="leaderboard"
                  color="blue500"
                  fontFamily="MaterialIcons"
                  fontSize={24}
                />
              </TouchableWithoutFeedback>
              <TouchableOpacity onPress={() => router.push("map")}>
                <Icon
                  name="map-marked-alt"
                  color="red500"
                  fontFamily="FontAwesome5"
                  fontSize={24}
                />
              </TouchableOpacity>
            </Div>
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
          headerRight: () => (
            <TouchableWithoutFeedback
              onPress={() => router.push("settings-edit-user")}
            >
              <Icon
                name="edit"
                color="black"
                fontFamily="Feather"
                fontSize={24}
              />
            </TouchableWithoutFeedback>
          ),
        }}
      />
      <Stack.Screen name="settings-edit-user" options={{ title: "Edit" }} />
      <Stack.Screen
        name="map"
        options={{ title: "Map", headerBackTitle: "Home" }}
      />
      <Stack.Screen
        name="add-new-place-form"
        options={{ title: "Add a new Place" }}
      />
      <Stack.Screen
        name="new-place-confirmation"
        options={{ title: "Place Review" }}
      />
      <Stack.Screen name="camera" options={{ headerShown: false }} />
      <Stack.Screen name="[place]" options={{ title: "Place" }} />
      <Stack.Screen name="leaderboard" options={{ title: "Leaderboard" }} />
    </Stack>
  );
};

export default AppLayout;

const styles = StyleSheet.create({});
