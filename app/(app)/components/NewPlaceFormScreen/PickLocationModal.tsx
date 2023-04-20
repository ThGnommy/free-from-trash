import { StyleSheet, useWindowDimensions } from "react-native";
import React, { useRef } from "react";
import { Button, Icon, Modal } from "react-native-magnus";
import MapView, { LatLng, MapPressEvent, Marker } from "react-native-maps";
import useUserLocation from "../../hooks/useUserLocation";
interface AddPlaceProps {
  visible: boolean;
  onClose: () => void;
  onPositionSelect: () => void;
  markerLocation: LatLng | null;
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

  const defaultLocation: LatLng = {
    latitude: 0,
    longitude: 0,
  };

  return (
    <Modal isVisible={visible}>
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
        {markerLocation && <Marker coordinate={markerLocation} />}
      </MapView>
      <>
        {markerLocation !== null ? (
          <Button
            w={180}
            borderless
            shadow="sm"
            bg="white"
            position="absolute"
            bottom={50}
            right={width / 2 - 90}
            rounded="circle"
            onPress={onPositionSelect}
            color="black"
          >
            Set marker position
          </Button>
        ) : null}
      </>

      <Button
        borderless
        shadow="sm"
        bg="white"
        position="absolute"
        top={60}
        left={20}
        rounded="circle"
        onPress={onClose}
        p={10}
      >
        <Icon color="black900" name="close" fontSize={18} />
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
