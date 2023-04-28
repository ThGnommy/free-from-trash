import { KeyboardAvoidingView, StyleSheet, TextInput } from "react-native";
import React, { useState } from "react";
import { Div, Text } from "react-native-magnus";
import { useApp } from "../../../../context/AppContext";

const PlaceDescriptionStep = () => {
  const { setNewDescription } = useApp();

  return (
    <Div
      flex={1}
      w="100%"
      justifyContent="center"
      alignItems="center"
      style={styles.container}
    >
      <Text fontSize="4xl">Step 3 (optional)</Text>
      <Text fontSize="2xl">Write a Description</Text>
      <TextInput
        editable={true}
        multiline={true}
        maxLength={200}
        placeholder="Max length 200 characters."
        onChangeText={(text) => setNewDescription(text)}
        keyboardType="default"
        style={styles.input}
      />
    </Div>
  );
};

export default PlaceDescriptionStep;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    width: "100%",
    gap: 15,
    paddingBottom: 30,
  },

  input: {
    backgroundColor: "#fff",
    width: "90%",
    borderWidth: 2,
    borderRadius: 5,
    height: 200,
    textAlignVertical: "top",
    padding: 10,
  },
});
