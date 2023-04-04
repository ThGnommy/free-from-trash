import { Link, useSegments } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import { Platform, StyleSheet } from "react-native";
import { useAuth } from "../../context/Auth";
import { Button, Div, Image, Text } from "react-native-magnus";
import { User, deleteUser } from "firebase/auth";
import { auth } from "../../firebaseInit";

export const Home = () => {
  const { signOut } = useAuth();
  const segment = useSegments();

  const user = auth.currentUser;

  const destroyUser = async () => {
    try {
      await deleteUser(user as User);
      signOut();
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  };

  return (
    <Div style={styles.container}>
      <Text>MAP</Text>
      <Text fontSize={24}>
        {JSON.stringify(user?.displayName || "unknown")}
      </Text>
      <Image
        w={100}
        h={100}
        rounded="circle"
        source={{ uri: user?.photoURL || "" }}
      />
      {/* Use a light status bar on iOS to account for the black space above the modal */}
      <Button onPress={signOut}>Logout</Button>
      <Button onPress={destroyUser}>Destroy user</Button>
      <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />
    </Div>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
