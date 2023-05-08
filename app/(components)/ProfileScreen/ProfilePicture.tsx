import { StyleSheet, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { Avatar, Div, Icon, Skeleton } from "react-native-magnus";
import { auth, db, storage } from "../../../firebaseInit";
import * as ImagePicker from "expo-image-picker";
import { ref, uploadBytes } from "firebase/storage";
import { User } from "firebase/auth";
import { updateUserPhotoURL } from "../../../firebaseUtils";
import { doc } from "firebase/firestore";

const ProfilePicture = () => {
  const currentUser = auth.currentUser as User;
  const [userProfile, setUserProfile] = useState<string | null>(
    currentUser.photoURL
  );

  const storagePath = `user-images/${currentUser?.uid}/profile-image`;

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.2,
    });

    if (!result.canceled) {
      uploadImageProfile(result.assets[0].uri);
    }
  };

  const uploadImageProfile = async (uri: string) => {
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
      xhr.open("GET", uri, true);
      xhr.send(null);
    });

    const storageRef = ref(storage, storagePath);
    // 'file' comes from the Blob or File API
    await uploadBytes(storageRef, blob).then(async (snapshot) => {
      console.log("Uploaded a blob or file!");

      const userRef = doc(db, "users", currentUser.uid);

      await updateUserPhotoURL(currentUser, storagePath, userRef);
      setUserProfile(currentUser.photoURL);
    });
  };

  return (
    <TouchableOpacity onPress={pickImage}>
      <Div>
        {userProfile ? (
          <Avatar
            mb={10}
            bg="red300"
            color="red800"
            size={100}
            source={{ uri: userProfile || "" }}
          >
            <Icon name="camera" fontFamily="Feather" color="black" />
          </Avatar>
        ) : (
          <Skeleton.Circle h={100} w={100} />
        )}

        <Icon
          style={styles.photoIcon}
          name="camera"
          fontFamily="Feather"
          color="black"
          fontSize={15}
          rounded="circle"
        />
      </Div>
    </TouchableOpacity>
  );
};

export default ProfilePicture;

const styles = StyleSheet.create({
  photoIcon: {
    position: "absolute",
    bottom: 15,
    right: -10,
    padding: 5,
    zIndex: 10,
    backgroundColor: "white",
    borderColor: "black",
    borderWidth: 1,
  },
});
