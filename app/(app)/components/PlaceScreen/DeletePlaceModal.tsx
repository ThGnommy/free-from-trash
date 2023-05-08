import { StyleSheet } from "react-native";
import React from "react";
import { Div, Avatar, Text, Modal, Button } from "react-native-magnus";
import { ICreator } from "../../../../context/types";
import {
  collection,
  doc,
  getDocs,
  increment,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { auth, db } from "../../../../firebaseInit";

interface ModalProps {
  user: ICreator;
  isVisible: boolean;
  handleDeletePlace: () => void;
  setDeleteModal: (state: boolean) => void;
  userJoinedPhoto: string[];
}

const DeletePlaceModal = ({
  user,
  isVisible,
  handleDeletePlace,
  setDeleteModal,
  userJoinedPhoto,
}: ModalProps) => {
  return (
    <Modal isVisible={isVisible} p={10}>
      <Div flex={1} justifyContent="center" alignItems="center">
        <Text fontSize="5xl" fontWeight="bold" mb={20}>
          Are you sure you want to delete this place?
        </Text>
        <Div row style={{ gap: 20 }}>
          <Button w={100} bg="green600" onPress={handleDeletePlace}>
            Yes
          </Button>
          <Button bg="gray900" w={100} onPress={() => setDeleteModal(false)}>
            Close
          </Button>
        </Div>
      </Div>
      <Text fontSize="3xl" textAlign="center" mb={10}>
        By cleaning this place
      </Text>
      <Div
        p={10}
        alignItems="center"
        w="100%"
        shadow="sm"
        shadowColor="#000"
        rounded="md"
        bg="green200"
      >
        <Div
          row
          justifyContent="center"
          alignItems="center"
          style={{ gap: 10 }}
        >
          <Avatar size={40} source={{ uri: user?.photoURL }} />
          <Text fontSize="xl">You'll earn 10 points!</Text>
        </Div>
      </Div>

      <>
        {userJoinedPhoto.length > 0 && (
          <Div
            p={10}
            mt={10}
            alignItems="center"
            w="100%"
            shadow="sm"
            shadowColor="#000"
            rounded="md"
            bg="green100"
          >
            <Text fontSize="2xl" textAlign="center" mb={10}>
              Your helpers will earn 5 points!
            </Text>
            <Div
              row
              justifyContent="center"
              alignItems="center"
              style={{ gap: 10 }}
            >
              {userJoinedPhoto.map((userJoined) => (
                <Avatar
                  key={userJoined}
                  size={40}
                  source={{ uri: userJoined }}
                />
              ))}
            </Div>
          </Div>
        )}
      </>
    </Modal>
  );
};

export default DeletePlaceModal;

const styles = StyleSheet.create({});
