import { StyleSheet } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { useSearchParams } from "expo-router";
import { INewPlace } from "../../context/AppContext";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { db } from "../../firebaseInit";
import { Avatar, Div, Image, Text } from "react-native-magnus";
import { ICreator } from "../../context/types";

const PlaceScreen = () => {
  const { placeId, creatorUID } = useSearchParams();

  const [place, setPlace] = useState<INewPlace>();

  const [user, setUser] = useState<ICreator>();

  const getPlaceInfo = async () => {
    const docRef = doc(db, "places", placeId as string);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      setPlace(docSnap.data() as INewPlace);
    } else {
      // docSnap.data() will be undefined in this case
      console.log("No such document!");
    }
  };

  const getUserInfo = async () => {
    const docRef = doc(db, "users", creatorUID as string);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      setUser(docSnap.data() as ICreator);
      console.log(docSnap.data());
    } else {
      // docSnap.data() will be undefined in this case
      console.log("No such document!");
    }
  };

  useEffect(() => {
    getPlaceInfo();
    getUserInfo();
  }, []);

  return (
    <Div flex={1}>
      <Avatar size={50} source={{ uri: user?.photoURL }} />
      <Text>{user?.name}'s Place</Text>
    </Div>
  );
};

export default PlaceScreen;

const styles = StyleSheet.create({});
