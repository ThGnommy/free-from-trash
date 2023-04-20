import { StyleSheet } from "react-native";
import React, { useState } from "react";
import { Button, Div, Icon, Image, Text } from "react-native-magnus";
import PickLocationModal from "./PickLocationModal";
import useUserLocation from "../../hooks/useUserLocation";
import { mapPreviewLocation } from "../../../../utils/location";
import { LatLng } from "react-native-maps";
import { useApp } from "../../../../context/AppContext";

const MapPickerStep = () => {
  const { location } = useUserLocation();

  const { setCoordinate, setPreviewMapImage } = useApp();

  const defaultLocation = {
    latitude: 0,
    longitude: 0,
  };

  const [mapImage, setMapImage] = useState<string | undefined>(undefined);
  const [showMap, setShowMap] = useState<boolean>(false);
  const [mapMarkerLocation, setMapMarkerLocation] =
    useState<LatLng>(defaultLocation);

  const setCurrentLocation = () => {
    const coord = {
      latitude: location.latitude,
      longitude: location.longitude,
    };

    setMapImage(mapPreviewLocation(coord));
    setCoordinate(coord);
    setPreviewMapImage(mapPreviewLocation(coord));
  };

  const setPreviewWithMarkerPosition = (mapMarkerLocation: LatLng) => {
    setShowMap(false);
    setMapImage(mapPreviewLocation(mapMarkerLocation));
    setCoordinate(mapMarkerLocation);
    setPreviewMapImage(mapPreviewLocation(mapMarkerLocation));
  };

  return (
    <Div style={styles.container}>
      <Text fontSize="4xl">Step 2</Text>
      <Text fontSize="2xl">Set a location</Text>
      <Div style={styles.placeholderImageContaner}>
        {mapImage ? (
          <Image
            rounded="md"
            style={styles.image}
            source={{
              uri: mapImage,
            }}
          />
        ) : (
          <Icon name="map" fontSize="4xl" fontFamily="Feather" />
        )}
      </Div>
      <Div
        style={{ width: "80%" }}
        flexDir="row"
        alignItems="center"
        justifyContent="space-between"
      >
        <Button
          bg="white"
          borderColor="red500"
          color="red500"
          underlayColor="red100"
          onPress={setCurrentLocation}
        >
          Current Location
        </Button>
        <Button onPress={() => setShowMap(true)}>Pick on Map</Button>
      </Div>
      <PickLocationModal
        visible={showMap}
        onClose={() => setShowMap(false)}
        markerLocation={mapMarkerLocation}
        setMarkerLocation={setMapMarkerLocation}
        onPositionSelect={() => setPreviewWithMarkerPosition(mapMarkerLocation)}
      />
    </Div>
  );
};

export default MapPickerStep;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    width: "100%",
    gap: 15,
    paddingBottom: 30,
  },
  placeholderImageContaner: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#e2e8f0",
    width: 300,
    height: 200,
  },
  image: {
    width: "100%",
    height: "100%",
  },
});

// https://maps.googleapis.com/maps/api/staticmap?center=Brooklyn+Bridge,New+York,NY&zoom=13&size=600x300&maptype=roadmap&markers=color:red%7Clabel:C%7C40.718217,-73.998284&key=AIzaSyA458oO8rn8YmIYkpN5NvkCp3rDtykuC7Y
