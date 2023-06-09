import React, { useCallback, useState } from "react";
import { Avatar, Button, Div, Icon, Skeleton, Text } from "react-native-magnus";

import { doc, getDoc } from "firebase/firestore";

import { Link, useFocusEffect } from "expo-router";
import { useApp } from "../../../../context/AppContext";
import { useAuth } from "../../../../context/Auth";
import { auth, db } from "../../../../firebaseInit";
import { StatusBar } from "expo-status-bar";

const Profile = () => {
  const { signOut } = useAuth();

  const { userProvince } = useApp();

  const currentUser = auth.currentUser;

  const [name, setName] = useState(currentUser?.displayName);
  const [score, setScore] = useState(0);

  const getUserInfo = async () => {
    const userRef = doc(db, "users", currentUser?.uid!);
    const userSnap = await getDoc(userRef);

    if (userSnap.exists()) {
      setName(userSnap.data().name);
      setScore(userSnap.data().score);
    } else {
      console.log("No such document!");
    }
  };

  // get user info when the screen is focused
  useFocusEffect(
    useCallback(() => {
      getUserInfo();
    }, [])
  );

  const SkeletonPlaceholder = () => (
    <Div flexDir="row" justifyContent="center" alignItems="center" w="90%">
      <Div flex={1}>
        <Skeleton.Box h={25} my={5} />
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
      {currentUser?.photoURL ? (
        <Avatar
          shadow="md"
          mt={20}
          mb={30}
          size={100}
          source={{ uri: currentUser?.photoURL! }}
        />
      ) : (
        <Skeleton.Circle w={100} h={100} mb={10} />
      )}

      {name && userProvince && currentUser?.email ? (
        <>
          <Div
            bg="primary"
            w="90%"
            p={10}
            mb={10}
            rounded="sm"
            flexDir="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Text>Email</Text>
            <Text>{currentUser?.email}</Text>
          </Div>

          <Div
            bg="primary"
            w="90%"
            p={10}
            mb={10}
            rounded="sm"
            flexDir="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Text>Display Name</Text>
            <Text>{name}</Text>
          </Div>
          <Div
            bg="primary"
            w="90%"
            p={10}
            mb={10}
            rounded="sm"
            flexDir="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Text>Province</Text>
            <Text>{userProvince}</Text>
          </Div>
          <Div
            bg="primary"
            w="90%"
            p={10}
            rounded="sm"
            flexDir="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Text>Score</Text>
            <Text>{score}</Text>
          </Div>
        </>
      ) : (
        <SkeletonPlaceholder />
      )}
      <Button
        bg="red"
        my={10}
        alignSelf="center"
        fontSize="2xl"
        prefix={
          <Icon
            name="log-out"
            color="white"
            fontFamily="Feather"
            fontSize="2xl"
            pr={10}
          />
        }
        onPress={() => signOut()}
      >
        Logout
      </Button>
      <StatusBar style={"dark"} />
      {__DEV__ && <Link href="_sitemap">__DEV__: Sitemap</Link>}
    </Div>
  );
};

export default Profile;
