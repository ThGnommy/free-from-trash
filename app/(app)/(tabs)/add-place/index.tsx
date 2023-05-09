import { KeyboardAvoidingView, Platform, StyleSheet } from "react-native";
import React, { useEffect, useRef } from "react";
import { ScrollDiv, Div, Button, Snackbar, Icon } from "react-native-magnus";
import ImagePickerStep from "../../../(components)/NewPlaceFormScreen/ImagePickerStep";
import MapPickerStep from "../../../(components)/NewPlaceFormScreen/MapPickerStep";
import PlaceDescriptionStep from "../../../(components)/NewPlaceFormScreen/PlaceDescriptionStep";
import { useApp } from "../../../../context/AppContext";
import { auth } from "../../../../firebaseInit";
import { useRouter, useSegments } from "expo-router";
import { ActionSheetProvider } from "@expo/react-native-action-sheet";
import { StatusBar } from "expo-status-bar";

const AddPlace = () => {
  const currentUser = auth.currentUser;

  const router = useRouter();
  const segments = useSegments();

  const PATH = segments.join("/");

  const { setCreatorUID, newPlace } = useApp();

  const snackbarRef = useRef<any>();

  useEffect(() => {
    setCreatorUID(currentUser?.uid!);
  }, []);

  const goToConfirmationScreen = () => {
    const missPhoto = newPlace.placeImages.every((photo) => photo === "");
    const missLocation = newPlace.previewMapImage === "";

    if (missPhoto && missLocation) {
      snackbarRef.current.show("Add at least one photo and select a location.");
    } else if (missPhoto && !missLocation) {
      snackbarRef.current.show("Add at least one photo.");
    } else if (!missPhoto && missLocation) {
      snackbarRef.current.show("Select a location.");
    } else {
      router.push(`${PATH}/place-preview`);
    }
  };

  return (
    <ActionSheetProvider>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollDiv bg="white">
          <Div justifyContent="flex-start" alignItems="center" w="100%">
            <ImagePickerStep />
            <MapPickerStep />
            <PlaceDescriptionStep />
            <Button
              bg="darker"
              color="white"
              onPress={goToConfirmationScreen}
              alignSelf="center"
              mb={25}
            >
              Preview
            </Button>
          </Div>
        </ScrollDiv>
        <Snackbar ref={snackbarRef} bg="red700" color="white" />
        <StatusBar style={"light"} />
      </KeyboardAvoidingView>
    </ActionSheetProvider>
  );
};

export default AddPlace;

const styles = StyleSheet.create({
  screen: {},
});
