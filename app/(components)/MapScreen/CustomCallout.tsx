import { StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import { useRouter } from "expo-router";
import { Callout } from "react-native-maps";
import { Div, Avatar, Icon, Text } from "react-native-magnus";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../../firebaseInit";

const CustomCallout = ({
  id,
  creatorUID,
}: {
  id: string;
  creatorUID: string;
}) => {
  const router = useRouter();

  const [photoURL, setPhotoURL] = useState();
  const [name, setName] = useState();

  const getInfo = async () => {
    const placeRef = doc(db, "users", creatorUID);
    const placeSnap = await getDoc(placeRef);

    if (placeSnap.exists()) {
      setPhotoURL(placeSnap.data().photoURL);
      setName(placeSnap.data().name);
    } else {
      // docSnap.data() will be undefined in this case
      console.log("No such document!");
    }
  };

  useEffect(() => {
    getInfo();
  }, []);

  return (
    <Callout
      tooltip
      onPress={() =>
        router.push({
          pathname: "[place]",
          params: {
            placeId: id,
            creatorUID: creatorUID,
          },
        })
      }
    >
      <Div
        bg="white"
        shadow="sm"
        shadowColor="#000"
        p={10}
        mb={5}
        rounded={10}
        justifyContent="center"
        alignItems="center"
        style={{ gap: 5 }}
      >
        <Div justifyContent="center" alignItems="center" style={{ gap: 5 }}>
          <Avatar size={40} source={{ uri: photoURL }} />
          <Text>{name}'s Place</Text>
        </Div>
        <Div
          row
          bg="gray900"
          justifyContent="center"
          alignItems="center"
          py={5}
          px={10}
          rounded="md"
          style={{ gap: 5 }}
        >
          <Text color="white">View this place</Text>
          <Icon
            name="arrow-right"
            fontFamily="Feather"
            fontSize={20}
            color="white"
          />
        </Div>
      </Div>
    </Callout>
  );
};

export default CustomCallout;

const styles = StyleSheet.create({});
