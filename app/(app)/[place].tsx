import { StyleSheet } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { useSearchParams } from "expo-router";
import { INewPlace } from "../../context/AppContext";
import { arrayUnion, doc, getDoc, updateDoc } from "firebase/firestore";
import { auth, db } from "../../firebaseInit";
import {
  Avatar,
  Button,
  Div,
  Image,
  ScrollDiv,
  Text,
} from "react-native-magnus";
import { ICreator } from "../../context/types";
import MapView, { Marker, Region } from "react-native-maps";
import { convertUidParamToArray } from "../../utils/utils";

const PlaceScreen = () => {
  const { placeId, creatorUID } = useSearchParams();

  // convert the string parameter into an array
  // const userJoinedArray = convertUidParamToArray(userJoined as string);

  const [place, setPlace] = useState<INewPlace>();
  const [user, setUser] = useState<ICreator>();
  const [userJoinedPhoto, setUserJoinedPhoto] = useState<
    string[] | undefined
  >();

  const currentUser = auth.currentUser;

  const getPlaceInfo = async () => {
    const docRef = doc(db, "places", placeId as string);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      setPlace(docSnap.data() as INewPlace);
    } else {
      // docSnap.data() will be undefined in this case
      console.log("No such document!");
    }
  };

  const getUserInfo = async () => {
    const docRef = doc(db, "users", creatorUID as string);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      setUser(docSnap.data() as ICreator);
    } else {
      // docSnap.data() will be undefined in this case
      console.log("No such document!");
    }
  };

  const getUserJoinedImage = async () => {
    const docRef = doc(db, "places", placeId as string);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      setUserJoinedPhoto(docSnap.data().userJoined);
    } else {
      // docSnap.data() will be undefined in this case
      console.log("No such document!");
    }
  };

  const handleJoined = useCallback(async () => {
    if (
      userJoinedPhoto &&
      userJoinedPhoto.includes(currentUser?.photoURL as string)
    )
      return;

    const currentUserPhoto: string = currentUser!.photoURL!;

    const placeRef = doc(db, "places", placeId as string);

    if (userJoinedPhoto === undefined) {
      setUserJoinedPhoto([currentUserPhoto]);
    } else setUserJoinedPhoto([...userJoinedPhoto, currentUserPhoto]);

    const docRef = doc(db, "users", currentUser?.uid!);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      await updateDoc(placeRef, {
        userJoined: arrayUnion(docSnap.data().photoURL),
      });
    } else {
      console.log("No such document!");
    }
  }, [userJoinedPhoto]);

  useEffect(() => {
    getPlaceInfo();
    getUserInfo();
    getUserJoinedImage();
  }, []);

  return (
    <ScrollDiv flex={1}>
      <Avatar size={50} source={{ uri: user?.photoURL }} />
      <Text>{user?.name}'s Place</Text>
      {place?.placeImages.map((image, idx) => (
        <Image
          key={idx}
          alignSelf="center"
          h={200}
          w="90%"
          rounded="lg"
          source={{
            uri:
              image ||
              "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541",
          }}
        />
      ))}
      <Text fontSize="4xl" fontWeight="bold">
        Description
      </Text>
      <Text>{place?.description}</Text>
      <Div alignItems="center" pointerEvents="none" shadow="sm">
        <MapView
          region={place?.coordinate as Region}
          maxZoomLevel={16}
          provider="google"
          style={styles.map}
        >
          <Marker coordinate={place?.coordinate!} />
        </MapView>
      </Div>
      <Div>
        <Text fontSize="4xl" fontWeight="bold">
          Helpers
        </Text>
        <Div row>
          {userJoinedPhoto ? (
            userJoinedPhoto.map((userPhoto, idx) => (
              <Avatar
                shadow={1}
                key={idx}
                size={50}
                m={5}
                source={{
                  uri:
                    userPhoto ||
                    "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541",
                }}
              />
            ))
          ) : (
            <Text>None.</Text>
          )}
        </Div>
      </Div>
      {!userJoinedPhoto?.includes(currentUser?.photoURL!) && (
        <Button onPress={handleJoined}>Join</Button>
      )}
    </ScrollDiv>
  );
};

export default PlaceScreen;

const styles = StyleSheet.create({
  map: {
    alignSelf: "center",
    width: "90%",
    height: 200,
    borderRadius: 16,
    overflow: "hidden",
  },
});
