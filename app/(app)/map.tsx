import { StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import MapView, {
  Callout,
  LatLng,
  Overlay,
  PROVIDER_GOOGLE,
  Region,
} from "react-native-maps";
import { Avatar, Div, Icon } from "react-native-magnus";
import * as Location from "expo-location";
import { auth } from "../../firebaseInit";
import ProfilePicture from "./components/ProfilePicture";

const Map = () => {
  const [location, setLocation] = useState<object | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const getUserLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      setErrorMsg("Permission to access location was denied");
      return;
    }

    let location = await Location.getCurrentPositionAsync({});
    setLocation({
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
    });
  };

  useEffect(() => {
    getUserLocation();
  }, []);

  return (
    <Div>
      <MapView
        showsUserLocation={true}
        // provider={PROVIDER_GOOGLE}
        style={styles.map}
        zoomControlEnabled={true}
        // followsUserLocation={true}
      ></MapView>
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
