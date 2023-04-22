import { StyleSheet } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import MapView, { Marker } from "react-native-maps";
import { Avatar, Div, Icon, Image } from "react-native-magnus";
import { useApp } from "../../context/AppContext";
import * as Location from "expo-location";

const Map = () => {
  const { placeList } = useApp();

  const mapRef = useRef<MapView | null>(null);

  const goToUserRegion = async () => {
    const region = await Location.geocodeAsync("Modena");

    const coord = {
      latitude: region[0].latitude,
      longitude: region[0].longitude,
    };

    mapRef.current?.animateCamera({ center: coord, zoom: 12 });
  };

  return (
    <Div>
      <MapView
        onMapReady={goToUserRegion}
        ref={mapRef}
        provider="google"
        style={styles.map}
        zoomControlEnabled={true}
      >
        {placeList?.map((place) => (
          <Marker coordinate={place.coordinate}></Marker>
        ))}
      </MapView>
    </Div>
  );
};

export default Map;

const styles = StyleSheet.create({
  map: {
    width: "100%",
    height: "100%",
  },
});
