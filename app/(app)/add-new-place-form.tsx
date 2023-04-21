import { StyleSheet } from "react-native";
import React, { useEffect, useRef } from "react";
import { ScrollDiv, Div, Button, Snackbar } from "react-native-magnus";
import ImagePickerStep from "./components/NewPlaceFormScreen/ImagePickerStep";
import MapPickerStep from "./components/NewPlaceFormScreen/MapPickerStep";
import PlaceDescriptionStep from "./components/NewPlaceFormScreen/PlaceDescriptionStep";
import { useApp } from "../../context/AppContext";
import { auth } from "../../firebaseInit";
import { useRouter } from "expo-router";
import { ActionSheetProvider } from "@expo/react-native-action-sheet";

const AddNewPlaceForm = () => {
  const currentUser = auth.currentUser;

  const router = useRouter();

  const { setCreator, newPlace } = useApp();

  const snackbarRef = useRef<any>();

  useEffect(() => {
    const creator = {
      name: currentUser?.displayName!,
      profilePhoto: currentUser?.photoURL!,
      email: currentUser?.email!,
    };
    setCreator(creator);
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
      router.push("new-place-confirmation");
    }
  };

  return (
    <ActionSheetProvider>
      <ScrollDiv flex={1} style={styles.screen}>
        <Div justifyContent="flex-start" alignItems="center" w="100%">
          <ImagePickerStep />
          <MapPickerStep />
          <PlaceDescriptionStep />
          <Button onPress={goToConfirmationScreen} alignSelf="center" mb={25}>
            Preview
          </Button>
          <Snackbar ref={snackbarRef} bg="red700" color="white" />
        </Div>
      </ScrollDiv>
    </ActionSheetProvider>
  );
};

export default AddNewPlaceForm;

const styles = StyleSheet.create({
  screen: {},
});
