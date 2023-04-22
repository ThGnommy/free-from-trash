import React from "react";
import { Badge, Button, Div, Icon, Image, Text } from "react-native-magnus";
import { ImageBackground, StyleSheet } from "react-native";
import { INewPlace } from "../../../../context/AppContext";

const Place = ({
  creator,
  placeImages,
  street,
  city,
  description,
}: INewPlace) => {
  return (
    <Div shadow="sm" m={10} p={10} rounded="md" bg="white">
      {/* <Image w="100%" h={150} rounded="md" source={{ uri: placeImages[0] }}> */}
      <Div
        h={150}
        rounded="md"
        bgImg={{ uri: placeImages[0] }}
        p={10}
        justifyContent="flex-end"
        alignItems="flex-end"
      >
        <Div
          bg="white"
          rounded="lg"
          row
          alignItems="center"
          justifyContent="flex-start"
          p={5}
        >
          <Icon
            fontSize={20}
            color="red500"
            name="map-pin"
            fontFamily="FontAwesome5"
            mr={10}
          />
          <Text>
            {street}, {city}
          </Text>
        </Div>
      </Div>

      {/* <Button w="100%">Show More</Button> */}
      <Div
        flexDir="row"
        justifyContent="flex-end"
        alignItems="center"
        style={{ gap: 10 }}
        mt={10}
      >
        <Text>{creator.name}'s Place</Text>

        <Image
          h={40}
          w={40}
          rounded="circle"
          source={{
            uri: creator.profilePhoto,
          }}
        />
      </Div>
    </Div>
  );
};

export default Place;

const styles = StyleSheet.create({
  imageBackground: {
    height: 150,
    borderRadius: 8,
    overflow: "hidden",
  },
});
