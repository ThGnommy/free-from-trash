import { StyleSheet } from "react-native";
import React from "react";
import { auth } from "../../firebaseInit";
import { Avatar, Div, Text } from "react-native-magnus";

const Settings = () => {
  const currentUser = auth.currentUser;

  return (
    <Div flex={1} justifyContent="flex-start" alignItems="center" p={10}>
      <Avatar
        bg="red300"
        color="red800"
        size={100}
        source={{ uri: currentUser!.photoURL! }}
      />
      <Text fontSize="4xl" py={10}>
        {currentUser?.displayName}
      </Text>
    </Div>
  );
};

export default Settings;

const styles = StyleSheet.create({});
