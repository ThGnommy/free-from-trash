import { FlatList, StyleSheet, Text, View } from "react-native";
import React from "react";
import { useApp } from "../../../context/AppContext";
import Place from "./Place";

const PlaceList = () => {
  const { placeList } = useApp();

  return (
    <FlatList
      data={placeList}
      renderItem={({ item }) => (
        <Place
          creatorUID={item.creatorUID}
          placeImages={item.placeImages}
          coordinate={item.coordinate}
          previewMapImage={item.previewMapImage}
          street={item.street}
          city={item.city}
          description={item.description}
          id={item.id}
          userJoined={item.userJoined}
        />
      )}
    />
  );
};

export default PlaceList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
  },
});
