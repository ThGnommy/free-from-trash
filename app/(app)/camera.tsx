import {
  StyleSheet,
  TouchableOpacity,
  useWindowDimensions,
} from "react-native";
import React, { useRef, useState } from "react";
import { Camera as ExpoCamera, CameraType } from "expo-camera";
import { Div, Icon, Image } from "react-native-magnus";
import { useRouter, useSearchParams } from "expo-router";
import { useApp } from "../../context/AppContext";

const Camera = () => {
  const dimensions = useWindowDimensions();
  const deviceHeight = dimensions.height;
  const deviceWidth = dimensions.width;

  const { setSingleNewImages, newPlace } = useApp();

  const router = useRouter();

  const params = useSearchParams();

  const [type, setType] = useState(CameraType.back);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const cameraRef = useRef<any>();

  const toggleCameraType = () => {
    setType((current) =>
      current === CameraType.back ? CameraType.front : CameraType.back
    );
  };

  const takePicture = async () => {
    const photo = await cameraRef.current.takePictureAsync();
    setPreviewImage(photo.uri);
  };

  const confirmPhoto = () => {
    setSingleNewImages(
      Number(params.index),
      previewImage!,
      newPlace.placeImages
    );
    router.back();
  };

  const exitFromCamera = () => {
    setPreviewImage(null);
    router.back();
  };

  return (
    <Div w={deviceWidth} h={deviceHeight}>
      {!previewImage ? (
        <ExpoCamera ref={cameraRef} style={styles.camera} type={type}>
          <TouchableOpacity
            style={styles.closeIcon}
            onPress={() => router.back()}
          >
            <Icon name="close" fontFamily="AntDesign" fontSize={40} />
          </TouchableOpacity>
          <TouchableOpacity onPress={toggleCameraType} style={styles.flipIcon}>
            <Icon
              name="flip-camera-ios"
              fontFamily="MaterialIcons"
              fontSize={40}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={{ ...styles.photoIcon, left: deviceWidth / 2 - 20 }}
            onPress={takePicture}
          >
            <Icon
              name="record-circle-outline"
              fontFamily="MaterialCommunityIcons"
              fontSize={40}
            />
          </TouchableOpacity>
        </ExpoCamera>
      ) : (
        <Div flex={1} w={deviceWidth} h={deviceHeight}>
          <Image w="100%" h="100%" source={{ uri: previewImage }} />
          <TouchableOpacity style={styles.closeIcon} onPress={exitFromCamera}>
            <Icon name="close" fontFamily="AntDesign" fontSize={40} />
          </TouchableOpacity>
          <TouchableOpacity
            style={{ ...styles.photoIcon, left: 50 }}
            onPress={() => setPreviewImage(null)}
          >
            <Icon
              name="camera-retake"
              fontFamily="MaterialCommunityIcons"
              fontSize={40}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={{ ...styles.photoIcon, left: deviceWidth / 2 - 20 }}
            onPress={confirmPhoto}
          >
            <Icon name="done" fontFamily="MaterialIcons" fontSize={40} />
          </TouchableOpacity>
        </Div>
      )}
    </Div>
  );
};

export default Camera;

const styles = StyleSheet.create({
  camera: {
    height: "100%",
  },
  closeIcon: {
    position: "absolute",
    left: 20,
    top: 40,
  },
  flipIcon: {
    position: "absolute",
    bottom: 40,
    left: 40,
    color: "#fff",
  },
  photoIcon: {
    position: "absolute",
    bottom: 40,
    color: "#fff",
  },
});
