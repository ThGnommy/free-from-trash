import { StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import { ResizeMode, Video } from "expo-av";
import { useFocusEffect } from "expo-router";

const BackgroundVideo = ({ canPlay }: { canPlay: boolean }) => {
  const videoClip = "../../../assets/videos/home_video.mp4";

  return (
    <Video
      style={[StyleSheet.absoluteFill]}
      source={require(videoClip)}
      resizeMode={ResizeMode.COVER}
      isLooping={true}
      useNativeControls={false}
      shouldPlay={canPlay}
    />
  );
};

export default BackgroundVideo;
