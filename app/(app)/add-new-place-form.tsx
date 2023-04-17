import { Animated, StyleSheet, useWindowDimensions } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { ScrollDiv, Div, Button } from "react-native-magnus";
import ImagePickerStep from "./components/NewPlaceFormScreen/ImagePickerStep";
import { SafeAreaView } from "react-native-safe-area-context";
import MapPickerStep from "./components/NewPlaceFormScreen/MapPickerStep";
import PlaceDescriptionStep from "./components/NewPlaceFormScreen/PlaceDescriptionStep";
import { useApp } from "../../context/AppContext";
import { auth } from "../../firebaseInit";
import { ICreator } from "../../context/types";
const AddNewPlaceForm = () => {
  const currentUser = auth.currentUser;

  const { setCreator } = useApp();

  useEffect(() => {
    const creator = {
      name: currentUser?.displayName || "",
      profilePhoto: currentUser?.photoURL || "",
      email: currentUser?.email || "",
    };
    setCreator(creator);
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }} edges={["right", "top", "left"]}>
      <ScrollDiv flex={1}>
        <Div justifyContent="flex-start" alignItems="center" w="100%">
          <ImagePickerStep />
          <MapPickerStep />
          <PlaceDescriptionStep />
        </Div>
        <Button
          // onPress={setNewPlace}
          alignSelf="center"
        >
          Confirm
        </Button>
      </ScrollDiv>
    </SafeAreaView>
  );
};

export default AddNewPlaceForm;

const styles = StyleSheet.create({});
