import { StyleSheet } from "react-native";
import React, { useRef } from "react";
import MapView, { LatLng, Marker } from "react-native-maps";
import { Div } from "react-native-magnus";
import * as Location from "expo-location";
import { useRouter } from "expo-router";
import { useApp } from "../../../../context/AppContext";
import { StatusBar } from "expo-status-bar";
import CustomCallout from "../../../(components)/MapScreen/CustomCallout";

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
            key={place.id}
            coordinate={place.coordinate}
            onPress={() => zoomToSelectedMarker(place.coordinate)}
          >
            <CustomCallout id={place.id!} creatorUID={place.creatorUID} />
          </Marker>
        ))}
      </MapView>
      <StatusBar style={"light"} />
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
