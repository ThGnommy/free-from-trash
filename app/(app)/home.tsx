import { Link, useSegments } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { Platform, SafeAreaView, StyleSheet } from "react-native";
import { useAuth } from "../../context/Auth";
import { Button, Div, Icon, Image, Modal, Text } from "react-native-magnus";
import AddPlace from "./components/AddPlace";

export const Home = () => {
  const { signOut } = useAuth();

  const [visible, setVisible] = useState<boolean>(false);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Div style={styles.container}>
        <Text>PLACE LIST</Text>
        <Button alignSelf="center" onPress={() => setVisible(true)}>
          Add a new Place
        </Button>
        <AddPlace visible={visible} onPress={() => setVisible(false)} />
        {/* <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} /> */}
      </Div>
    </SafeAreaView>
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
