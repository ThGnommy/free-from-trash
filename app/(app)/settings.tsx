import { StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import {
  Avatar,
  Button,
  Div,
  Icon,
  Input,
  Skeleton,
  Text,
} from "react-native-magnus";
import { User, updateProfile } from "firebase/auth";
import { useAuth } from "../../context/Auth";
import { auth, db } from "../../firebaseInit";
import ProfilePicture from "./components/SettingsScreen/ProfilePicture";
import CitySelector from "../shared-components/CitySelector";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { useApp } from "../../context/AppContext";

const Settings = () => {
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

      await updateDoc(userRef, {
        name: name,
      });
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  };

  const SkeletonPlaceholder = () => (
    <Div flexDir="row" justifyContent="center" alignItems="center" w="90%">
      <Div flex={1}>
        <Skeleton.Box h={25} my={5} />
        <Skeleton.Box h={25} my={5} />
        <Skeleton.Box h={25} my={5} />
      </Div>
    </Div>
  );

  return (
    <Div
      flex={1}
      justifyContent="flex-start"
      alignItems="center"
      p={10}
      bg="white"
    >
      <Text fontSize="4xl" py={10}>
        Your Profile
      </Text>
      <ProfilePicture />
      {name && currentProvince && currentUser?.email ? (
        <>
          <Div
            bg="gray200"
            w="90%"
            p={10}
            mb={10}
            rounded="10"
            flexDir="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Text>Email</Text>
            <Text>{currentUser?.email}</Text>
          </Div>

          <Div
            bg="gray200"
            w="90%"
            p={10}
            mb={10}
            rounded="10"
            flexDir="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Text>Display Name</Text>
            <Text>{name}</Text>
          </Div>
          <Div
            bg="gray200"
            w="90%"
            p={10}
            rounded="10"
            flexDir="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Text>Province</Text>
            <Text>{currentProvince}</Text>
          </Div>
        </>
      ) : (
        <SkeletonPlaceholder />
      )}
      <Button
        bg="red"
        my={10}
        alignSelf="center"
        fontSize={20}
        prefix={
          <Icon
            name="log-out"
            color="white"
            fontFamily="Feather"
            fontSize={20}
            pr={10}
          />
        }
        onPress={() => signOut()}
      >
        Logout
      </Button>
    </Div>
  );
};

export default Settings;
