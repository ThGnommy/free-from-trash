import React, { useEffect, useState } from "react";
import { Div, Icon, Image, Skeleton, Text } from "react-native-magnus";
import { StyleSheet, TouchableWithoutFeedback } from "react-native";
import { INewPlace } from "../../../../context/AppContext";
import { query, collection, where, getDocs } from "firebase/firestore";
import { db } from "../../../../firebaseInit";
import { useRouter } from "expo-router";

const Place = ({
  creatorUID,
  placeImages,
  street,
  city,
  id,
  userJoined,
  description,
}: INewPlace) => {
  const [name, setName] = useState<string>("");
  const [photoURL, setPhotoURL] = useState<string>("");

  const router = useRouter();

  const getPlaceInfo = async () => {
    const q = query(collection(db, "users"), where("uid", "==", creatorUID));

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      setName(doc.data().name);
      setPhotoURL(doc.data().photoURL);
    });
  };

  useEffect(() => {
    getPlaceInfo();
  }, []);

  return (
    <Div shadow="sm" m={10} p={10} rounded="md" bg="white">
      {placeImages && (
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
      )}
      <TouchableWithoutFeedback
        onPress={() =>
          router.push({
            pathname: "[place]",
            params: {
              placeId: id,
              creatorUID,
            },
          })
        }
      >
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
      </TouchableWithoutFeedback>
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
