import React from "react";
import { Link, Stack, useSegments } from "expo-router";
import { Icon } from "react-native-magnus";

export const unstable_settings = {
  initialRouteName: "index",
};

const SettingsLayout = () => {
  const segment = useSegments();

  const PATH = segment.join("/");

  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: "Profile",
          headerRight: () => (
            <Link href={`${PATH}/edit-profile`}>
              <Icon
                name="edit"
                color="black"
                fontFamily="Feather"
                fontSize={24}
              />
            </Link>
          ),
        }}
      />
      <Stack.Screen name="edit-profile" options={{ title: "Edit Profile" }} />
    </Stack>
  );
};

export default SettingsLayout;
