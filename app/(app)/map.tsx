import { StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import MapView, { Marker } from "react-native-maps";
import { Avatar, Div, Icon, Image } from "react-native-magnus";
import { useApp } from "../../context/AppContext";

const Map = () => {
  const { placeList } = useApp();
  return (
    <Div>
      <MapView provider="google" style={styles.map} zoomControlEnabled={true}>
        {placeList?.map((place) => (
          <Marker coordinate={place.coordinate}>
            {/* <Image
              source={require("../../assets/images/waste-icon.png")}
              w={50}
              h={50}
              bg="black"
              rounded="circle"
            /> */}
          </Marker>
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
