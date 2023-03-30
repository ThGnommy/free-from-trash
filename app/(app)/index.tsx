import { Link, useSegments } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import { Button, Platform, StyleSheet } from "react-native";
import { Text, View } from "../../components/Themed";
import { useAuth } from "../../context/Auth";

export const Home = () => {
  const { signOut, user } = useAuth();
  const segment = useSegments();

  useEffect(() => {}, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Home</Text>
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
      <Text>{JSON.stringify(user)}</Text>
      <Text>{JSON.stringify(segment)}</Text>
      <Button title="Sign Out" onPress={signOut} />
      <Link href="page-two">Page Two</Link>
      {/* Use a light status bar on iOS to account for the black space above the modal */}
      <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />
    </View>
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
