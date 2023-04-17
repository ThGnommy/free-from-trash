import { StyleSheet, useWindowDimensions } from "react-native";
import React, {
  ButtonHTMLAttributes,
  useEffect,
  useRef,
  useState,
} from "react";
import { Button, Div, Icon, Text, Modal } from "react-native-magnus";
import MapView, {
  LatLng,
  MapPressEvent,
  Marker,
  Overlay,
} from "react-native-maps";
import useUserLocation from "../../hooks/useUserLocation";
import * as Location from "expo-location";
interface AddPlaceProps {
  visible: boolean;
  onClose: () => void;
  onPositionSelect: () => void;
  markerLocation: LatLng;
  setMarkerLocation: (x: LatLng) => void;
}

const PickLocationModal = ({
  visible,
  onClose,
  onPositionSelect,
  markerLocation,
  setMarkerLocation,
}: AddPlaceProps) => {
  const { location } = useUserLocation();

  const { width } = useWindowDimensions();

  const mapRef = useRef<MapView | null>(null);

  const goToUserLocation = () => {
    mapRef.current?.animateCamera({ center: location, zoom: 18 });
  };

  const setNewMarkerLocation = (e: MapPressEvent) => {
    setMarkerLocation(e.nativeEvent.coordinate);
  };

  const clearMarker = () => {
    const defaultCoord = {
      latitude: 0,
      longitude: 0,
    };
    setMarkerLocation(defaultCoord);
  };

  return (
    <Modal isVisible={visible} onDismiss={clearMarker}>
      <MapView
        ref={mapRef}
        provider="google"
        style={styles.map}
        showsUserLocation={true}
        showsMyLocationButton={true}
        onMapReady={goToUserLocation}
        userLocationUpdateInterval={30000}
        rotateEnabled={false}
        onPress={(e) => setNewMarkerLocation(e)}
      >
        {markerLocation && (
          <Marker coordinate={markerLocation} title="My Location" />
        )}
      </MapView>
      <Button
        w={180}
        bg="blue200"
        borderColor="black"
        borderWidth={2}
        position="absolute"
        bottom={50}
        right={width / 2 - 90}
        rounded="circle"
        onPress={onPositionSelect}
      >
        Set marker position
      </Button>
      <Button
        bg="gray400"
        h={35}
        w={35}
        position="absolute"
        top={50}
        right={15}
        rounded="circle"
        onPress={onClose}
      >
        <Icon color="black900" name="close" />
      </Button>
    </Modal>
  );
};

export default PickLocationModal;

const styles = StyleSheet.create({
  map: {
    width: "100%",
    height: "100%",
  },
  setPositionBtn: {
    position: "absolute",
    width: 100,
    bottom: 150,
    right: 150,
  },
});
