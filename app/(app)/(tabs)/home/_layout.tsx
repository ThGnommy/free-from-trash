import React from "react";
import { Link, Stack, useSegments } from "expo-router";
import { Icon } from "react-native-magnus";

export const unstable_settings = {
  initialRouteName: "index",
};

const HomeLayout = () => {
  const segment = useSegments();

  const PATH = segment.join("/");

  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: "Home",
          headerLeft: () => (
            <Link href={`${PATH}/leaderboard`}>
              <Icon
                name="leaderboard"
                color="black"
                fontFamily="MaterialIcons"
                fontSize={24}
              />
            </Link>
          ),
          headerRight: () => (
            <Link href={`${PATH}/map`}>
              <Icon
                name="map"
                color="black"
                fontFamily="Feather"
                fontSize={24}
              />
            </Link>
          ),
        }}
      />
      <Stack.Screen
        name="map"
        options={{ title: "Places Overview", headerBackTitle: "Home" }}
      />
    </Stack>
  );
};

export default HomeLayout;
