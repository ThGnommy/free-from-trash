import { StyleSheet } from "react-native";
import React, { useState } from "react";
import { Avatar, Button, Div, Icon, Input, Text } from "react-native-magnus";
import { updateProfile } from "firebase/auth";
import { useAuth } from "../../context/Auth";
import { auth } from "../../firebaseInit";
import ProfilePicture from "./components/ProfilePicture";

const Settings = () => {
  const { signOut } = useAuth();

  const currentUser = auth.currentUser;

  const [name, setName] = useState(currentUser?.displayName);

  const updateUserName = async () => {
    try {
      await updateProfile(currentUser!, { displayName: name });
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  };

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
        rounded="10"
        flexDir="row"
        justifyContent="space-between"
        alignItems="center"
      >
        <Text>Display Name</Text>
        <Input
          bg="transparent"
          borderWidth={0}
          p={0}
          value={name as string}
          onChangeText={(text) => setName(text)}
          onSubmitEditing={updateUserName}
        />
      </Div>
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
