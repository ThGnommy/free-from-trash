import { StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import { Button, Div, Input, Text } from "react-native-magnus";
import { useAuth } from "../../context/Auth";
import { auth, db } from "../../firebaseInit";
import ProfilePicture from "./components/SettingsScreen/ProfilePicture";
import CitySelector from "../shared-components/CitySelector";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { useApp } from "../../context/AppContext";
import { User, updateProfile } from "firebase/auth";

const SettingsEditUser = () => {
  const { signOut } = useAuth();

  const { userProvince, updateUserProvince } = useApp();

  const currentUser = auth.currentUser;

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
    </Div>
  );
};

export default SettingsEditUser;
