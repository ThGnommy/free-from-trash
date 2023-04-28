import { StatusBar } from "expo-status-bar";
import { useContext, useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { useAuth } from "../../context/Auth";
import { Button, Div, Fab, Icon, ScrollDiv, Text } from "react-native-magnus";
// import AddPlace from "./components/NewPlaceFormScreen/AddPlace";
import { useRouter } from "expo-router";
import {
  collection,
  doc,
  getDoc,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { auth, db } from "../../firebaseInit";
import { INewPlace, useApp } from "../../context/AppContext";

import PlaceList from "./components/HomeScreen/PlaceList";
import { SafeAreaView } from "react-native-safe-area-context";

export const Home = () => {
  const { updatePlaceList, placeList, updateUserProvince } = useApp();

  const router = useRouter();

  const currentUser = auth.currentUser;

  const readUserProvince = async () => {
    const docRef = doc(db, "users", currentUser?.uid!);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      // console.log("Document data:", docSnap.data());
      return docSnap.data().province;
    } else {
      // docSnap.data() will be undefined in this case
      console.log("No such document!");
    }
  };

  useEffect(() => {
    const placeList = query(collection(db, "places"), orderBy("date", "desc"));

    const unsubscribe = onSnapshot(placeList, async (querySnapshot) => {
      const temp: unknown[] = [];

      const userCurrentProvince = await readUserProvince();

      updateUserProvince(userCurrentProvince);

      querySnapshot.forEach((doc) => {
        if (doc.data().city === userCurrentProvince) temp.push(doc.data());
      });

      updatePlaceList(temp as INewPlace[]);
    });

    return unsubscribe;
  }, []);

  return (
    <>
      <SafeAreaView edges={["bottom"]} style={{ flex: 1 }}>
        <Div flex={1}>
          {placeList && placeList!.length > 0 ? (
            <PlaceList />
          ) : (
            <Text>No plase was found...</Text>
          )}
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
