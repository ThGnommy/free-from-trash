import { StyleSheet, TouchableOpacity } from "react-native";
import React, { useRef } from "react";
import * as ExpoImagePicker from "expo-image-picker";
import {
  Div,
  Icon,
  Image,
  Snackbar,
  Text,
  useTheme,
} from "react-native-magnus";
import { useApp } from "../../../context/AppContext";
import { useActionSheet } from "@expo/react-native-action-sheet";
import { Camera } from "expo-camera";
import { useRouter } from "expo-router";
const ImagePickerStep = () => {
  const router = useRouter();

  const { theme } = useTheme();

  const { setSingleNewImages, newPlace, removeSelectedImage } = useApp();

  const { showActionSheetWithOptions } = useActionSheet();

  const [_, requestPermission] = Camera.useCameraPermissions();
  const snackbarRef = useRef<any>();

  const pickImage = async (idx: number) => {
    const imageIsEmpty = newPlace.placeImages.at(idx) === "";

    const optionsNoRemove = ["Camera", "Gallery", "Cancel"];
    const optionsWithRemove = ["Camera", "Gallery", "Remove", "Cancel"];

    const options = imageIsEmpty === true ? optionsNoRemove : optionsWithRemove;

    const arrayNoRemove = [0, 1];
    const arrayWithRemove = [0, 1, 2];

    const destructiveButtonIndex =
      imageIsEmpty === true ? arrayNoRemove : arrayWithRemove;

    const cancelButtonIndex = imageIsEmpty === true ? 2 : 3;

    showActionSheetWithOptions(
      {
        options,
        destructiveButtonIndex,
        cancelButtonIndex,
      },
      async (index) => {
        switch (index) {
          case destructiveButtonIndex[0]:
            // Camera
            await requestPermission().then((permission) => {
              if (permission?.status === "granted") {
                // Pass the index of the image, so we now where to put the camera photo
                router.push({
                  pathname: `camera`,
                  params: { index: idx },
                });
              }
              if (!permission || !permission.granted) {
                snackbarRef.current.show(
                  "We need your permission to show the camera."
                );
              }
            });
            break;

          case destructiveButtonIndex[1]:
            // Gallery
            // No permissions request is necessary for launching the image library
            let result = await ExpoImagePicker.launchImageLibraryAsync({
              mediaTypes: ExpoImagePicker.MediaTypeOptions.Images,
              allowsEditing: true,
              aspect: [4, 3],
              quality: 0.5,
              selectionLimit: 1,
            });

            if (!result.canceled) {
              setSingleNewImages(idx, result.assets[0].uri);
            }
            break;
          case destructiveButtonIndex[2]:
            removeSelectedImage(idx);
            break;
          case cancelButtonIndex:
          // Canceled
        }
      }
    );
  };

  return (
    <>
      <Div style={styles.container}>
        <Text fontSize="4xl">Step 1</Text>
        <Text fontSize="2xl">Choose max of three photos</Text>
        <Div
          flex={1}
          justifyContent="center"
          flexDir="row"
          flexWrap="wrap"
          style={{ gap: 10 }}
        >
          {newPlace.placeImages.map((_, idx) => (
            <TouchableOpacity
              onPress={() => pickImage(idx)}
              activeOpacity={0.7}
              style={{
                ...styles.placeholderImageContaner,
                backgroundColor: theme.colors?.primary,
              }}
              key={idx}
            >
              {newPlace.placeImages[idx] ? (
                <Image
                  rounded="md"
                  style={styles.image}
                  source={{
                    uri: newPlace.placeImages[idx],
                  }}
                />
              ) : (
                <Icon color="secondary" name="plus" fontSize="4xl" />
              )}
            </TouchableOpacity>
          ))}
        </Div>
      </Div>
      <Snackbar
        style={{ position: "absolute" }}
        ref={snackbarRef}
        bg="red700"
        color="white"
      />
    </>
  );
};

export default ImagePickerStep;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
    justifyContent: "flex-start",
    alignItems: "center",
    width: "100%",
    gap: 15,
    paddingBottom: 30,
  },
  placeholderImageContaner: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: 150,
    height: 100,
  },
  image: {
    width: "100%",
    height: "100%",
  },
});
