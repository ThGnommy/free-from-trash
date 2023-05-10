import {
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
} from "react-native";
import React, { createRef, useEffect, useState } from "react";
import { Div, Input, Text, Button, Icon, Snackbar } from "react-native-magnus";
import { Link, useFocusEffect } from "expo-router";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebaseInit";
// import BackgroundVideo from "./components/BackgroundVideo";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import backgroundImage from "../../assets/images/trash-cleanup.jpg";

const Login = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [playVideo, setPlayVideo] = useState(true);

  const snackbarRef = createRef<any>();

  const login = async (email: string, password: string) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      if (error instanceof Error) {
        snackbarRef.current.show(error.message);
        throw new Error(error.message);
      }
    }
  };

  return (
    <ImageBackground
      source={backgroundImage}
      style={{ width: "100%", height: "100%" }}
    >
      <SafeAreaView style={styles.container}>
        {/* <BackgroundVideo canPlay={playVideo} /> */}
        <Div style={{ backgroundColor: "transparent" }}>
          <Text
            color="primary"
            fontSize={35}
            mt={50}
            fontWeight="bold"
            bg="darker"
            p={10}
            rounded="md"
          >
            FREE FROM TRASH
          </Text>
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
          >
            <Text
              color="primary"
              fontSize="6xl"
              fontWeight="bold"
              textAlign="left"
            >
              Login
            </Text>
            <Input
              value={email}
              onChangeText={(text) => setEmail(text)}
              placeholder="E-mail"
              keyboardType="email-address"
            />
            <Input
              value={password}
              onChangeText={(text) => setPassword(text)}
              placeholder="Password"
              secureTextEntry={!showPassword}
              suffix={
                <Pressable onPress={() => setShowPassword((prev) => !prev)}>
                  <Icon
                    name={showPassword ? "eye" : "eye-off"}
                    color="black"
                    fontFamily="Feather"
                  />
                </Pressable>
              }
            />
            <Button
              onPress={() => login(email, password)}
              w={"100%"}
              bg="darker"
              color="white"
              rounded="circle"
            >
              LOGIN WITH EMAIL
            </Button>
            <Text fontSize="xl" color="white" textAlign="center">
              Not yet a member?{" "}
              <Link style={styles.login} href="/sign-in">
                Register
              </Link>
            </Text>
          </Div>
          <Div h={10}></Div>
        </KeyboardAvoidingView>
        <Snackbar ref={snackbarRef} bg="red600" color="white" />
        <StatusBar style={"dark"} />
      </SafeAreaView>
    </ImageBackground>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
  },
  buttonContainer: {
    gap: 10,
  },
  login: {
    fontWeight: "700",
  },
});
