import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { ResizeMode, Video } from "expo-av";

const BackgroundVideo = () => {
  const videoClip = "../../../assets/videos/home_video.mp4";

  return (
    <Video
      style={[StyleSheet.absoluteFill]}
      source={require(videoClip)}
      resizeMode={ResizeMode.COVER}
      isLooping
      useNativeControls={false}
      shouldPlay={true}
    />
  );
};

export default BackgroundVideo;

const styles = StyleSheet.create({});
