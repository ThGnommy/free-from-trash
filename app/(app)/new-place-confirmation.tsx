import { StyleSheet } from "react-native";
import React from "react";
import { Button, Div, Image, ScrollDiv, Text } from "react-native-magnus";
import { auth } from "../../firebaseInit";
import { useApp } from "../../context/AppContext";

const NewPlaceConfirmation = () => {
  const { newPlace } = useApp();

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
      <Button my={30} alignSelf="center">
        Confirm Place
      </Button>
    </ScrollDiv>
  );
};

export default NewPlaceConfirmation;

const styles = StyleSheet.create({});
