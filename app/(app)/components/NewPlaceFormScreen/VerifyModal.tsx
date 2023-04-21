import { StyleSheet } from "react-native";
import React, { useEffect } from "react";
import { Div, Icon, Modal, Text } from "react-native-magnus";
import { useApp } from "../../../../context/AppContext";

const VerifyModal = ({
  visible,
  onDismiss,
}: {
  visible: boolean;
  onDismiss: () => void;
}) => {
  const { newPlace } = useApp();

  return (
    <Modal isVisible={visible} onDismiss={onDismiss}>
      <Div flex={1} alignItems="center" justifyContent="center">
        <Icon
          name="done"
          fontFamily="MaterialIcons"
          fontSize={40}
          bg="green400"
          color="white"
          p={20}
          mb={20}
          rounded="circle"
        />
        <Div>
          <Text mb={20} fontSize="5xl">
            Thanks {newPlace.creator.name}!
          </Text>
          <Text fontSize="3xl">The place is added successfully.</Text>
        </Div>
      </Div>
    </Modal>
  );
};

export default VerifyModal;

const styles = StyleSheet.create({});
