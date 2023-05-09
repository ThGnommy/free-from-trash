import React from "react";
import { Link, Stack, useSegments } from "expo-router";
import { Icon, useTheme } from "react-native-magnus";

export const unstable_settings = {
  initialRouteName: "index",
};

const SettingsLayout = () => {
  const segment = useSegments();
  const PATH = segment.join("/");

  const { theme } = useTheme();

  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: "Profile",
          headerTitleAlign: "center",
          headerRight: () => (
            <Link href={`${PATH}/edit-profile`}>
              <Icon
                name="edit"
                color="darker"
                fontFamily="Feather"
                fontSize={24}
              />
            </Link>
          ),
        }}
      />
      <Stack.Screen
        name="edit-profile"
        options={{
          title: "Edit Profile",
          headerStyle: {
            backgroundColor: theme.colors?.darker,
          },
          headerTintColor: theme.colors?.primary,
        }}
      />
    </Stack>
  );
};

export default SettingsLayout;
