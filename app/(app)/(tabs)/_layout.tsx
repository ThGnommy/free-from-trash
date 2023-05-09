import { Tabs } from "expo-router";
import { Icon, useTheme } from "react-native-magnus";

export const unstable_settings = {
  initialRouteName: "index",
};

const AppLayout = () => {
  const { theme } = useTheme();

  return (
    <Tabs
      screenOptions={{
        tabBarHideOnKeyboard: true,
        tabBarStyle: {
          // paddingBottom: 10,
          backgroundColor: theme.colors?.primary,
        },
        tabBarActiveTintColor: "darker",
        tabBarInactiveTintColor: "secondary",
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarIcon: ({ focused, color }) => (
            <Icon
              name="md-home-sharp"
              fontFamily="Ionicons"
              fontSize={20}
              rounded="circle"
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="add-place"
        options={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarIcon: ({ focused, color }) => (
            <Icon
              name="add-circle"
              fontFamily="MaterialIcons"
              mb={5}
              fontSize={40}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarIcon: ({ focused, color }) => (
            <Icon
              name="user"
              fontFamily="FontAwesome"
              fontSize={20}
              rounded="circle"
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
};

export default AppLayout;
