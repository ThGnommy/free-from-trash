import { StyleSheet, TouchableOpacity } from "react-native";
import React, { useContext, useState } from "react";
import * as ExpoImagePicker from "expo-image-picker";
import { Div, Icon, Image, Text } from "react-native-magnus";
import { useApp } from "../../../../context/AppContext";
const ImagePickerStep = ({
  images,
  setImages,
}: {
  images: [string, string, string];
  setImages: (x: [string, string, string]) => void;
}) => {
  const pickImage = async (idx: number) => {
    // No permissions request is necessary for launching the image library
    let result = await ExpoImagePicker.launchImageLibraryAsync({
      mediaTypes: ExpoImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.5,
    });

    if (!result.canceled) {
      const newArr: [string, string, string] = [...images];
      const replaced = images[idx].replace(images[idx], result.assets[0].uri);
      newArr[idx] = replaced;
      setImages(newArr);
    }
  };

  return (
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
        {images.slice(0, 3).map((_, idx) => (
          <TouchableOpacity
            onPress={() => pickImage(idx)}
            activeOpacity={0.7}
            style={styles.placeholderImageContaner}
            key={idx}
          >
            {images[idx] ? (
              <Image
                rounded="md"
                style={styles.image}
                source={{
                  uri: images[idx],
                }}
              />
            ) : (
              <Icon name="plus" fontSize="4xl" />
            )}
          </TouchableOpacity>
        ))}
      </Div>
    </Div>
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
    backgroundColor: "#e2e8f0",
    width: 150,
    height: 100,
  },
  image: {
    width: "100%",
    height: "100%",
  },
});
