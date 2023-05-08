import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import { Div, Text } from "react-native-magnus";
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
      <Div flex={1}>
        {placeList && placeList!.length > 0 ? (
          <PlaceList />
        ) : (
          <Text>No plase was found...</Text>
        )}
        <StatusBar style={"light"} />
      </Div>
    </>
  );
};

export default Home;
