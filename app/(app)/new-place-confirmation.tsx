import { StyleSheet } from "react-native";
import React, { useEffect } from "react";
import { Button, Div, Image, ScrollDiv, Text } from "react-native-magnus";
import { auth, db, storage } from "../../firebaseInit";
import { useApp } from "../../context/AppContext";
import { collection, doc, setDoc } from "firebase/firestore";
import { ref, uploadBytes } from "firebase/storage";

const NewPlaceConfirmation = () => {
  const { newPlace } = useApp();

  const uploadPlaceImages = async (id: string) => {
    newPlace.placeImages.forEach(async (image: string, idx: number) => {
      if (image !== "") {
        const blob: Blob = await new Promise((resolve, reject) => {
          const xhr = new XMLHttpRequest();
          xhr.onload = function () {
            resolve(xhr.response);
          };
          xhr.onerror = function (e) {
            console.log(e);
            reject(new TypeError("Network request failed"));
          };
          xhr.responseType = "blob";
          xhr.open("GET", image, true);
          xhr.send(null);
        });

        const storageRef = ref(storage, `${id}/image-${idx}`);
        // 'file' comes from the Blob or File API
        await uploadBytes(storageRef, blob).then(async (snapshot) => {
          console.log("Uploaded a blob or file!");
        });
      }
    });
  };

  const writeNewPlaceInDB = async () => {
    const place = {
      creator: newPlace.creator,
      coordinate: newPlace.coordinate,
      previewMapImage: newPlace.previewMapImage,
      street: newPlace.street,
      description: newPlace.description,
    };

    try {
      const newPlaceRef = doc(collection(db, "places"));

      await setDoc(newPlaceRef, place);

      uploadPlaceImages(newPlaceRef.id);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  };

  return (
    <ScrollDiv flex={1} p={10}>
      <Text textAlign="center" fontSize="2xl">
        Selected images
      </Text>
      <Div alignItems="center" style={{ gap: 10 }} my={30}>
        {newPlace.placeImages.map(
          (image) =>
            image !== "" && (
              <Image rounded="md" w={250} h={200} source={{ uri: image }} />
            )
        )}
      </Div>
      <Text textAlign="center" fontSize="2xl">
        Selected location
      </Text>

      <Image
        mt={30}
        alignSelf="center"
        rounded="md"
        w={250}
        h={200}
        source={{ uri: newPlace.previewMapImage }}
      />
      <Div>
        {newPlace.description ? (
          <Div alignSelf="center" w="90%" my={30}>
            <Text fontSize="2xl">Description:</Text>
            <Text>{newPlace.description}</Text>
          </Div>
        ) : (
          <Text fontSize="2xl">No description.</Text>
        )}
      </Div>
      <Text>
        Location: {newPlace.coordinate.latitude},{" "}
        {newPlace.coordinate.longitude}
      </Text>
      <Button onPress={writeNewPlaceInDB} my={30} alignSelf="center">
        Confirm Place
      </Button>
    </ScrollDiv>
  );
};

export default NewPlaceConfirmation;

const styles = StyleSheet.create({});
