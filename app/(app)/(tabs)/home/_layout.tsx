import React from "react";
import { Link, Stack, useSegments } from "expo-router";
import { Icon, useTheme } from "react-native-magnus";

export const unstable_settings = {
  initialRouteName: "index",
};

const HomeLayout = () => {
  const segment = useSegments();
  const PATH = segment.join("/");

  const { theme } = useTheme();

  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: "Home",
          headerTitleAlign: "center",
          headerLeft: () => (
            <Link href={`${PATH}/leaderboard`}>
              <Icon
                name="leaderboard"
                color="secondary"
                fontFamily="MaterialIcons"
                fontSize={24}
              />
            </Link>
          ),
          headerRight: () => (
            <Link href={`${PATH}/map`}>
              <Icon
                name="map"
                color="secondary"
                fontFamily="Feather"
                fontSize={24}
              />
            </Link>
          ),
        }}
      />
      <Stack.Screen
        name="leaderboard"
        options={{
          title: "Leaderboard",
          headerTitleAlign: "center",
          headerBackTitle: "Home",
          headerStyle: {
            backgroundColor: theme.colors?.darker,
          },
          headerTintColor: theme.colors?.primary,
        }}
      />
      <Stack.Screen
        name="map"
        options={{
          title: "Places Overview",
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

export default HomeLayout;
