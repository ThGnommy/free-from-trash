import { StyleSheet } from "react-native";
import React, { useRef, useState } from "react";
import { Button, Div, Icon, Image, Modal } from "react-native-magnus";
import MapView, { LatLng, Marker } from "react-native-maps";
import useUserLocation from "../hooks/useUserLocation";

interface AddPlaceProps {
  visible: boolean;
  onPress: () => void;
}

const AddPlace = ({ visible, onPress }: AddPlaceProps) => {
  const { location } = useUserLocation();

  const [markerLocation, setMarkerLocation] = useState<LatLng>();

  const mapRef = useRef<MapView | null>(null);

  const goToUserLocation = () => {
    mapRef.current?.animateCamera({ center: location, zoom: 18 });
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
        onPress={(e) => setMarkerLocation(e.nativeEvent.coordinate)}
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
        {markerLocation && (
          <Marker coordinate={markerLocation} title="My Location?" />
        )}
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
  markerFixed: {
    left: "50%",
    marginLeft: -24,
    marginTop: -48,
    position: "absolute",
    top: "50%",
  },
  marker: {
    height: 48,
    width: 48,
  },
});
