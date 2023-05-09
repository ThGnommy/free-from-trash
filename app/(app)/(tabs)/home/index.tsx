import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import { StyleSheet, useWindowDimensions } from "react-native";
import { Div, Icon, Text } from "react-native-magnus";
import {
  collection,
  doc,
  getDoc,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { auth, db } from "../../../../firebaseInit";
import { INewPlace, useApp } from "../../../../context/AppContext";
import PlaceList from "../../../(components)/HomeScreen/PlaceList";

export const Home = () => {
  const { updatePlaceList, placeList, updateUserProvince } = useApp();

  const currentUser = auth.currentUser;

  const dimensions = useWindowDimensions();

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
      <Div flex={1} bg="white">
        {placeList && placeList!.length > 0 ? (
          <PlaceList />
        ) : (
          <Div style={{ ...styles.notFoundText, top: dimensions.height / 3 }}>
            <Text
              color="darker"
              fontSize="4xl"
              opacity={0.5}
              textAlign="center"
            >
              We can't find any places.
            </Text>
            <Text
              color="darker"
              mt={20}
              fontSize="4xl"
              opacity={0.5}
              textAlign="center"
            >
              Add a place yourself!
            </Text>
            <Icon
              mt={50}
              color="darker"
              name="long-arrow-down"
              fontFamily="FontAwesome"
              fontSize={50}
              opacity={0.5}
            />
          </Div>
        )}
        <StatusBar style={"light"} />
      </Div>
      <StatusBar style={"dark"} />
    </>
  );
};

export default Home;

const styles = StyleSheet.create({
  notFoundText: {
    textAlign: "center",
  },
});
