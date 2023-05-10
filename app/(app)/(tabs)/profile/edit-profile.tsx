import { StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import { Button, Div, Input, Text } from "react-native-magnus";
import { User, updateProfile } from "firebase/auth";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import ProfilePicture from "../../../(components)/ProfileScreen/ProfilePicture";
import { useApp } from "../../../../context/AppContext";
import { auth, db } from "../../../../firebaseInit";
import CitySelector from "../../../shared-components/CitySelector";
import { StatusBar } from "expo-status-bar";

const EditProfile = () => {
  const { userProvince } = useApp();

  const currentUser = auth.currentUser;

  const [prevName] = useState(currentUser?.displayName);
  const [name, setName] = useState(currentUser?.displayName);
  const [currentProvince, setCurrentProvince] = useState<string>(userProvince);
  const [province, setProvince] = useState<string | undefined>(undefined);

  const getUserInfo = async () => {
    const userRef = doc(db, "users", currentUser?.uid!);
    const userSnap = await getDoc(userRef);

    if (userSnap.exists()) {
      setName(userSnap.data().name);
    } else {
      console.log("No such document!");
    }
  };

  useEffect(() => {
    getUserInfo();
  }, []);

  const updateUserProvinceInDB = async () => {
    const userRef = doc(db, "users", currentUser?.uid!);

    await updateDoc(userRef, {
      province: province,
    });
  };

  useEffect(() => {
    if (province !== currentProvince && province) {
      updateUserProvinceInDB();
    }
  }, [province]);

  const updateUserName = async () => {
    try {
      const userRef = doc(db, "users", currentUser?.uid!);
      await updateProfile(currentUser as User, { displayName: name });
      await updateDoc(userRef, {
        name: name,
      });
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }

    // Update the creator name with the new one
    try {
      const placesRef = collection(db, "places");
      // Get all the places with the previous creator name
      const q = query(placesRef, where("creatorInfo.name", "==", prevName));

      const querySnapshot = await getDocs(q);
      querySnapshot.forEach(async (docSnap) => {
        const placeRef = doc(db, "places", docSnap.id);

        await updateDoc(placeRef, {
          ["creatorInfo.name"]: name,
        });
      });
    } catch (error) {
      throw new Error((error as Error).message);
    }
  };

  return (
    <Div
      flex={1}
      w="100%"
      justifyContent="flex-start"
      alignItems="center"
      p={10}
      bg="white"
    >
      <Text fontSize="4xl" py={10}>
        Edit Profile Info
      </Text>
      <ProfilePicture />

      <Div w="90%">
        <Text
          w="100%"
          textAlign="left"
          fontSize="2xl"
          fontWeight="bold"
          mb={10}
        >
          Edit your Display Name
        </Text>
        <Input
          onSubmitEditing={updateUserName}
          onChangeText={(text) => setName(text)}
          value={name!}
          bg="gray200"
          w="100%"
          p={10}
          mb={10}
          rounded="md"
        />
        <Text
          w="100%"
          textAlign="left"
          fontSize="2xl"
          fontWeight="bold"
          mb={10}
        >
          Edit your Province
        </Text>
        <CitySelector
          selectValue={province ? province : currentProvince}
          setSelectedValue={setProvince}
        />
      </Div>
      <StatusBar style={"light"} />
    </Div>
  );
};

export default EditProfile;
