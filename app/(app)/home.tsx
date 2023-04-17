import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import { useAuth } from "../../context/Auth";
import { Button, Div, Fab, Icon, Text } from "react-native-magnus";
// import AddPlace from "./components/NewPlaceFormScreen/AddPlace";
import { useRouter } from "expo-router";

export const Home = () => {
  const { signOut } = useAuth();

  const router = useRouter();

  const [visible, setVisible] = useState<boolean>(false);

  return (
    <>
      <SafeAreaView style={{ flex: 1 }}>
        <Div style={styles.container}>
          <Text>PLACE LIST</Text>
          {/* <AddPlace visible={visible} onPress={() => setVisible(false)} /> */}
          {/* <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} /> */}
        </Div>
      </SafeAreaView>

      <Fab bg="blue600" fontSize="xl">
        <Button
          p="none"
          bg="transparent"
          justifyContent="flex-end"
          onPress={() => router.push("add-new-place-form")}
        >
          <Div rounded="sm" bg="white" p="sm">
            <Text fontSize="md">Add a new place</Text>
          </Div>
          <Icon
            w={30}
            h={30}
            name="place"
            color="blue600"
            fontFamily="MaterialIcons"
            fontSize="5xl"
            rounded="circle"
            ml="md"
            bg="white"
          />
        </Button>
      </Fab>
    </>
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
