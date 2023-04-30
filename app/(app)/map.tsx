import { StyleSheet } from "react-native";
import React, { Suspense, useEffect, useRef, useState } from "react";
import MapView, { Callout, LatLng, Marker } from "react-native-maps";
import { Avatar, Div, Icon, Text } from "react-native-magnus";
import { useApp } from "../../context/AppContext";
import * as Location from "expo-location";
import { useRouter } from "expo-router";

const Map = () => {
  const { placeList, userProvince } = useApp();

  const router = useRouter();

  const mapRef = useRef<MapView | null>(null);

  const goToUserRegion = async () => {
    const region = await Location.geocodeAsync(userProvince);

    const coord = {
      latitude: region[0].latitude,
      longitude: region[0].longitude,
    };

    mapRef.current?.animateCamera({ center: coord, zoom: 12 });
  };

  const zoomToSelectedMarker = (coord: LatLng) => {
    mapRef.current?.animateCamera({ center: coord, zoom: 18 });
  };

  return (
    <Div>
      <MapView
        onMapReady={goToUserRegion}
        ref={mapRef}
        provider="google"
        style={styles.map}
        zoomControlEnabled={true}
        onCalloutPress={() => console.log("press?")}
        showsUserLocation={true}
      >
        {placeList?.map((place) => (
          <Marker
            coordinate={place.coordinate}
            onPress={() => zoomToSelectedMarker(place.coordinate)}
          >
            <Callout
              tooltip
              onPress={() =>
                router.push({
                  pathname: "[place]",
                  params: {
                    placeId: place.id,
                    creatorUID: place.creatorUID,
                  },
                })
              }
            >
              <Div
                bg="white"
                shadow="sm"
                p={10}
                mb={5}
                rounded={10}
                justifyContent="center"
                alignItems="center"
                style={{ gap: 5 }}
              >
                <Div
                  justifyContent="center"
                  alignItems="center"
                  style={{ gap: 5 }}
                >
                  <Avatar
                    size={40}
                    source={{ uri: place.creatorInfo.photoURL || "" }}
                  />
                  <Text>{place.creatorInfo.name}'s Place</Text>
                </Div>
                <Div
                  row
                  bg="gray900"
                  justifyContent="center"
                  alignItems="center"
                  py={5}
                  px={10}
                  rounded="md"
                  style={{ gap: 5 }}
                >
                  <Text color="white">View this place</Text>
                  <Icon
                    name="arrow-right"
                    fontFamily="Feather"
                    fontSize={20}
                    color="white"
                  />
                </Div>
              </Div>
            </Callout>
          </Marker>
        ))}
      </MapView>
    </Div>
  );
};

export default Map;

const styles = StyleSheet.create({
  preview: {
    width: "100%",
    height: 100,
    borderRadius: 16,
    overflow: "hidden",
    backgroundColor: "white",
    padding: 10,
  },
  map: {
    width: "100%",
    height: "100%",
    padding: 10,
  },
});
