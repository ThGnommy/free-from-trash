import { StyleSheet } from "react-native";
import React from "react";
import { ResizeMode, Video } from "expo-av";

const BackgroundVideo = () => {
  const videoClip = "../../../assets/videos/home_video.mp4";

  const poster = "../../../assets/images/trash-cleanup.jpg";

  return (
    <Video
      style={[StyleSheet.absoluteFill]}
      source={require(videoClip)}
      resizeMode={ResizeMode.COVER}
      isLooping={true}
      useNativeControls={false}
      shouldPlay={true}
      posterSource={require(poster)}
      usePoster={true}
    />
  );
};

export default BackgroundVideo;
