import { StyleSheet } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { Button, Icon, Modal } from "react-native-magnus";
import MapView, { LatLng, Marker } from "react-native-maps";
import useUserLocation from "../hooks/useUserLocation";

interface AddPlaceProps {
  visible: boolean;
  onPress: () => void;
}

const AddPlace = ({ visible, onPress }: AddPlaceProps) => {
  const [follow, setFollow] = useState(true);

  const { location, errorMsg } = useUserLocation();

  const disablefollowsUserLocation = () => setFollow(false);

  const getAddressFromCoord = (x) => {
    console.log(x);
  };

  return (
    <Modal isVisible={visible}>
      <MapView
        showsUserLocation={true}
        followsUserLocation={true}
        // onRegionChangeComplete={disablefollowsUserLocation}
        addressForCoordinate={(x: LatLng) => getAddressFromCoord(x)}
        style={styles.map}
      >
        <Button
          bg="blue300"
          position="absolute"
          top={20}
          right={20}
          rounded="circle"
          zIndex={10}
          onPress={onPress}
        >
          <Icon color="gray900" name="x" fontFamily="Feather" fontSize={20} />
        </Button>
        <Marker coordinate={location} />
      </MapView>
    </Modal>
  );
};

export default AddPlace;

const styles = StyleSheet.create({
  map: {
    width: "100%",
    height: "100%",
  },
});
