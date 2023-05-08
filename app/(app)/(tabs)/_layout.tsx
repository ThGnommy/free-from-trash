import React, { useEffect, useRef } from "react";
import { Tabs } from "expo-router";
import { Icon } from "react-native-magnus";

export const unstable_settings = {
  initialRouteName: "index",
};

const AppLayout = () => {
  return (
    <Tabs
      screenOptions={{
        tabBarHideOnKeyboard: true,
        tabBarStyle: {
          position: "absolute",
          paddingBottom: 0,
          borderRadius: 32,
          marginHorizontal: 10,
          marginVertical: 20,
          backgroundColor: "orange",
        },
        tabBarActiveTintColor: "orange",
        tabBarInactiveTintColor: "black",
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarIcon: (props) => (
            <Icon
              name="home"
              fontFamily="Feather"
              fontSize={26}
              bg="white"
              p={10}
              bottom={props.focused ? 5 : 0}
              rounded="circle"
              color={props.color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="add-place"
        options={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarIcon: (props) => (
            <Icon
              name="add-location-alt"
              fontFamily="MaterialIcons"
              fontSize={26}
              bg="white"
              p={10}
              bottom={props.focused ? 5 : 0}
              rounded="circle"
              color={props.color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarIcon: (props) => (
            <Icon
              name="user"
              fontFamily="Feather"
              fontSize={26}
              bg="white"
              p={10}
              bottom={props.focused ? 5 : 0}
              rounded="circle"
              color={props.color}
            />
          ),
        }}
      />
    </Tabs>
  );
};

export default AppLayout;
