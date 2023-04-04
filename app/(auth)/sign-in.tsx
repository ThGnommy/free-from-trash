import {
  StyleSheet,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  TextInput,
} from "react-native";
import React, { useContext, useEffect, useRef, useState } from "react";
import { useAuth } from "../../context/Auth";
import { Link, useRouter, useSegments } from "expo-router";
import { ResizeMode, Video } from "expo-av";
import { Button, Div, Icon, Input, Text } from "react-native-magnus";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  updateProfile,
} from "firebase/auth";
import { auth } from "../../firebaseInit";

const videoClip = "../../assets/videos/home_video.mp4";

const Signin = () => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const register = async (email: string, password: string) => {
    const placeholderAvatar =
      "https://todaysmama.com/.image/t_share/MTU5OTA4ODA1NTYyNDEwMzU5/image-placeholder-title.jpg";

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      await sendEmailVerification(userCredential.user);

      await updateProfile(userCredential.user, {
        displayName: name,
        photoURL: placeholderAvatar,
      }).catch((error) => {
        throw new Error(error.message);
      });
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Video
        style={[StyleSheet.absoluteFill]}
        source={require(videoClip)}
        resizeMode={ResizeMode.COVER}
        isLooping
        useNativeControls={false}
        shouldPlay={true}
      />
      <Div style={{ backgroundColor: "transparent" }}>
        <Text style={styles.title}>FREE OF TRASH</Text>
      </Div>
      <KeyboardAvoidingView
        style={{ width: "100%" }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <Div
          style={styles.buttonContainer}
          w={"100%"}
          px={10}
          justifyContent="center"
          alignItems="center"
        >
          <Input
            value={name}
            onChangeText={(text) => setName(text)}
            placeholder="Full Name"
          />
          <Input
            value={email}
            onChangeText={(text) => setEmail(text)}
            placeholder="E-mail"
          />
          <Input
            value={password}
            onChangeText={(text) => setPassword(text)}
            placeholder="Password"
            secureTextEntry
          />
          <Button
            onPress={() => register(email, password)}
            w={"100%"}
            bg="white"
            rounded="circle"
            color="black"
          >
            REGISTER WITH EMAIL
          </Button>
          <Text fontSize="xl" color="white">
            Already a member?{" "}
            <Link style={styles.login} href="/login">
              Log in
            </Link>
          </Text>
        </Div>
        <Div h={10}></Div>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default Signin;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
  },
  buttonContainer: {
    gap: 10,
  },
  title: {
    color: "#fff",
    fontSize: 40,
    fontWeight: "700",
    marginTop: 50,
  },
  login: {
    fontWeight: "700",
  },
});
