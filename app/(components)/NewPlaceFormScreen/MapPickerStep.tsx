import { StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import { Button, Div, Icon, Image, Text } from "react-native-magnus";
import PickLocationModal from "./PickLocationModal";
import useUserLocation from "../../hooks/useUserLocation";
import { mapPreviewLocation } from "../../../utils/location";
import * as Location from "expo-location";
import { LatLng } from "react-native-maps";
import { useApp } from "../../../context/AppContext";

const MapPickerStep = () => {
  const { location } = useUserLocation();
  const { newPlace, setCoordinate, setPreviewMapImage, setNewStreet } =
    useApp();

  const defaultLocation = {
    latitude: 0,
    longitude: 0,
  };

  const [mapImage, setMapImage] = useState<string | undefined>(undefined);
  const [showMap, setShowMap] = useState<boolean>(false);
  const [mapMarkerLocation, setMapMarkerLocation] = useState<LatLng | null>(
    null
  );

  useEffect(() => {
    if (newPlace.previewMapImage && !mapImage)
      setMapImage(newPlace.previewMapImage);

    return () => setMapImage(undefined);
  }, []);

  const setCurrentLocation = async () => {
    const coord = {
      latitude: location.latitude,
      longitude: location.longitude,
    };

    const street = await getStreetFromLocation(coord);

    setMapImage(mapPreviewLocation(coord));
    setCoordinate(coord);
    setPreviewMapImage(mapPreviewLocation(coord));
    setNewStreet(street.street!, street.city!);
  };

  const getStreetFromLocation = async (location: LatLng) => {
    const street = await Location.reverseGeocodeAsync(location);

    return { street: street[0].name, city: street[0].city };
  };

  const setPreviewWithMarkerPosition = async (
    mapMarkerLocation: LatLng | null
  ) => {
    const street = await getStreetFromLocation(mapMarkerLocation!);

    setShowMap(false);
    setMapImage(mapPreviewLocation(mapMarkerLocation ?? defaultLocation));
    setCoordinate(mapMarkerLocation ?? defaultLocation);
    setPreviewMapImage(
      mapPreviewLocation(mapMarkerLocation ?? defaultLocation)
    );
    setNewStreet(street.street!, street.city!);
  };

  return (
    <Div style={styles.container}>
      <Text fontSize="4xl">Step 2</Text>
      <Text fontSize="2xl">Set a location</Text>
      <Div style={styles.placeholderImageContaner} bg="primary">
        {mapImage ? (
          <Image
            rounded="md"
            style={styles.image}
            source={{
              uri: mapImage,
            }}
          />
        ) : (
          <Icon
            name="map"
            fontSize="4xl"
            fontFamily="Feather"
            color="secondary"
          />
        )}
      </Div>
      <Div
        style={{ width: "80%" }}
        flexDir="row"
        alignItems="center"
        justifyContent="space-between"
      >
        <Button bg="darker" color="white" onPress={setCurrentLocation}>
          Current Location
        </Button>
        <Button bg="darker" color="white" onPress={() => setShowMap(true)}>
          Pick on Map
        </Button>
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
    width: 300,
    height: 200,
  },
  image: {
    width: "100%",
    height: "100%",
  },
});

// https://maps.googleapis.com/maps/api/staticmap?center=Brooklyn+Bridge,New+York,NY&zoom=13&size=600x300&maptype=roadmap&markers=color:red%7Clabel:C%7C40.718217,-73.998284&key=AIzaSyA458oO8rn8YmIYkpN5NvkCp3rDtykuC7Y
