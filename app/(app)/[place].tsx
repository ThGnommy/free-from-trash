import { StyleSheet } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "expo-router";
import { INewPlace } from "../../context/AppContext";
import {
  arrayRemove,
  arrayUnion,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  increment,
  query,
  updateDoc,
  where,
} from "firebase/firestore";

import {
  Avatar,
  Button,
  Div,
  Image,
  ScrollDiv,
  Skeleton,
  Text,
} from "react-native-magnus";

import MapView, { Marker, Region } from "react-native-maps";
import { SafeAreaView } from "react-native-safe-area-context";
import { ref, listAll, deleteObject } from "firebase/storage";
import { Camera } from "expo-camera";
import DeletePlaceModal from "../(components)/PlaceScreen/DeletePlaceModal";
import { ICreator } from "../../context/types";
import { auth, db, storage } from "../../firebaseInit";
import { containAStringElement } from "../../utils/utils";

const PlaceScreen = () => {
  const { placeId, creatorUID } = useSearchParams();

  const [place, setPlace] = useState<INewPlace>();
  const [user, setUser] = useState<ICreator>();
  const [userJoinedPhoto, setUserJoinedPhoto] = useState<string[]>([]);

  const [deleteModal, setDeleteModal] = useState<boolean>(false);

  const currentUser = auth.currentUser;

  const router = useRouter();

  const userAlreadyJoined = userJoinedPhoto?.includes(
    currentUser?.photoURL as string
  );

  const getPlaceInfo = async () => {
    const docRef = doc(db, "places", placeId as string);

    try {
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setPlace(docSnap.data() as INewPlace);
      } else {
        // docSnap.data() will be undefined in this case
        console.log("No such document!");
      }
    } catch (error) {
      throw new Error((error as Error).message);
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
    const currentUserPhoto: string = currentUser!.photoURL!;

    const placeRef = doc(db, "places", placeId as string);

    if (userJoinedPhoto === undefined) {
      setUserJoinedPhoto([currentUserPhoto]);
    } else setUserJoinedPhoto([...userJoinedPhoto, currentUserPhoto]);

    const docRef = doc(db, "users", currentUser?.uid!);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      await updateDoc(placeRef, {
        userJoined: userAlreadyJoined
          ? arrayRemove(docSnap.data().photoURL)
          : arrayUnion(docSnap.data().photoURL),
      });

      if (userAlreadyJoined) {
        setUserJoinedPhoto((prev) =>
          prev?.filter((photo) => photo !== docSnap.data().photoURL)
        );
      }
    } else {
      console.log("No such document!");
    }
  }, [userJoinedPhoto]);

  const handleDeletePlace = async () => {
    await deleteDoc(doc(db, "places", placeId as string));
    await updateScores();
    await deleteAllPlaceImages();
    router.back();
  };

  const deleteAllPlaceImages = async () => {
    // Create a reference under which you want to list
    const listRef = ref(storage, `places/${placeId as string}`);

    // Find all the prefixes and items.
    await listAll(listRef)
      .then((res) => {
        res.items.forEach(async (itemRef) => {
          await deleteObject(itemRef);
          try {
          } catch (error) {
            if (error instanceof Error) {
              throw new Error(error.message);
            }
          }
        });
      })
      .catch((error) => {
        // Uh-oh, an error occurred!
      });
  };

  const updateScores = async () => {
    const userRef = doc(db, "users", currentUser?.uid!);

    await updateDoc(userRef, {
      score: increment(10),
    });

    userJoinedPhoto.forEach(async (url) => {
      const usersRef = collection(db, "users");

      const q = query(usersRef, where("photoURL", "==", url));

      const querySnapshot = await getDocs(q);

      querySnapshot.forEach(async (docSnaphot) => {
        console.log(docSnaphot.id, " => ", docSnaphot.data());

        const userRef = doc(db, "users", docSnaphot.id);

        await updateDoc(userRef, {
          score: increment(5),
        });
      });
    });
  };

  useEffect(() => {
    getPlaceInfo();
    getUserInfo();
    getUserJoinedImage();
  }, []);

  const SkeletonPlaceholder = () => (
    <Div flex={1} alignSelf="center" mt={20} w="90%">
      <Div>
        <Skeleton.Circle h={50} w={50} mb={20} />
        <Skeleton.Box h={25} />
      </Div>
      <Div>
        <Skeleton.Box h={100} my={20} />
        <Skeleton.Box h={25} />
        <Skeleton.Box h={150} my={20} />
        <Skeleton.Box h={25} />
      </Div>
    </Div>
  );

  return (
    <SafeAreaView
      edges={["bottom"]}
      style={{ height: "100%", backgroundColor: "white" }}
    >
      {place && user && userJoinedPhoto ? (
        <ScrollDiv px={20}>
          <Div my={10}>
            <Avatar
              size={50}
              source={{
                uri:
                  user?.photoURL ||
                  "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541",
              }}
            />
            <Text fontSize="4xl" fontWeight="bold" mt={10}>
              {user?.name}'s Place
            </Text>
          </Div>
          <Div
            flexDir="column"
            justifyContent="center"
            alignItems="center"
            style={{ gap: 10 }}
          >
            {place?.placeImages.map((image) => (
              <Image
                key={image}
                alignSelf="center"
                h={200}
                w="100%"
                rounded="lg"
                source={{
                  uri:
                    image ||
                    "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541",
                }}
              />
            ))}
          </Div>
          <Text my={10} fontSize="3xl" fontWeight="bold">
            Description
          </Text>
          <Text mb={10}>
            {place?.description ? place.description : "No description."}
          </Text>
          <Text mb={10} fontSize="3xl" fontWeight="bold">
            Location
          </Text>
          <Div
            mb={10}
            alignItems="center"
            pointerEvents="none"
            shadow="sm"
            shadowColor="#000"
          >
            {place?.coordinate && (
              <MapView
                initialCamera={{
                  center: place.coordinate,
                  heading: 1,
                  pitch: 1,
                  zoom: 15,
                }}
                maxZoomLevel={16}
                provider="google"
                style={styles.map}
              >
                <Marker coordinate={place.coordinate} />
              </MapView>
            )}
          </Div>
          <Div>
            <Text fontSize="3xl" fontWeight="bold">
              Helpers
            </Text>
            <Div row style={{ gap: 10 }}>
              {containAStringElement(userJoinedPhoto) ? (
                userJoinedPhoto?.map((userPhoto, idx) => (
                  <Avatar
                    key={userPhoto}
                    shadow="md"
                    shadowColor="#000"
                    size={50}
                    my={5}
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
          {creatorUID !== currentUser?.uid && (
            <Button
              bg={userAlreadyJoined ? "red600" : "blue600"}
              mt={10}
              onPress={handleJoined}
            >
              {!userAlreadyJoined ? "Join" : "Leave"}
            </Button>
          )}
          {creatorUID === currentUser?.uid && (
            <Button
              w="100%"
              bg="red700"
              mt={10}
              mb={20}
              onPress={() => setDeleteModal(true)}
            >
              Delete Place
            </Button>
          )}
          <DeletePlaceModal
            user={user!}
            isVisible={deleteModal}
            handleDeletePlace={handleDeletePlace}
            userJoinedPhoto={userJoinedPhoto}
            setDeleteModal={setDeleteModal}
          />
        </ScrollDiv>
      ) : (
        <SkeletonPlaceholder />
      )}
    </SafeAreaView>
  );
};

export default PlaceScreen;

const styles = StyleSheet.create({
  map: {
    alignSelf: "center",
    width: "100%",
    height: 200,
    borderRadius: 16,
    overflow: "hidden",
  },
});
