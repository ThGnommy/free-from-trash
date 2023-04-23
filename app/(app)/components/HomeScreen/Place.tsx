import React, { useEffect, useState } from "react";
import { Badge, Button, Div, Icon, Image, Text } from "react-native-magnus";
import { ImageBackground, StyleSheet } from "react-native";
import { INewPlace } from "../../../../context/AppContext";
import { query, collection, where, getDocs } from "firebase/firestore";
import { db } from "../../../../firebaseInit";

const Place = ({
  creatorUID,
  placeImages,
  street,
  city,
  description,
}: INewPlace) => {
  const [name, setName] = useState<string>("");
  const [photoURL, setPhotoURL] = useState<string>("");

  const getPlaceInfo = async () => {
    const q = query(collection(db, "users"), where("uid", "==", creatorUID));

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      console.log(doc.id, " => ", doc.data());

      setName(doc.data().name);
      setPhotoURL(doc.data().photoURL);
    });
  };

  useEffect(() => {
    getPlaceInfo();
  }, []);

  return (
    <Div shadow="sm" m={10} p={10} rounded="md" bg="white">
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
        justifyContent="space-between"
        alignItems="center"
        mt={10}
      >
        <Div row alignItems="center">
          <Image
            h={40}
            w={40}
            rounded="circle"
            source={{
              uri: photoURL,
            }}
          />
          <Text ml={10}>{name}'s Place</Text>
        </Div>
        <Icon
          name="chevron-right"
          fontFamily="Feather"
          fontSize={24}
          color="black"
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
