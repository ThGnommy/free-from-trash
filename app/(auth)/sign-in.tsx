import {
  StyleSheet,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
} from "react-native";
import React, { createRef, useEffect, useState } from "react";
import { Link, useFocusEffect } from "expo-router";
import { Button, Div, Icon, Input, Snackbar, Text } from "react-native-magnus";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db } from "../../firebaseInit";
import BackgroundVideo from "./components/BackgroundVideo";
import CitySelector from "../shared-components/CitySelector";
import { doc, setDoc } from "firebase/firestore";
import { ICreator } from "../../context/types";
import { StatusBar } from "expo-status-bar";

const Signin = () => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [province, setProvince] = useState<string>("");

  const [playVideo, setPlayVideo] = useState(true);

  const register = async (email: string, password: string) => {
    const placeholderAvatar =
      "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png";

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      const newUserRef = doc(db, "users", userCredential.user.uid);

      const userData: ICreator = {
        name: name,
        email: email,
        province: province,
        photoURL: placeholderAvatar,
        uid: userCredential.user.uid,
        score: 0,
      };

      await setDoc(newUserRef, userData);

      await updateProfile(userCredential.user, {
        displayName: name,
        photoURL: placeholderAvatar,
      });
    } catch (error) {
      if (error instanceof Error) {
        snackbarRef.current.show(error.message);
        throw new Error(error.message);
      }
    }
  };

  useFocusEffect(() => {
    setPlayVideo(true);
  });

  useEffect(() => {
    return () => setPlayVideo(false);
  }, []);

  const snackbarRef = createRef<any>();

  return (
    <SafeAreaView style={styles.container}>
      <BackgroundVideo canPlay={playVideo} />
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
          // alignItems="center"
        >
          <Text
            color="primary"
            fontSize="6xl"
            fontWeight="bold"
            textAlign="left"
          >
            Register
          </Text>
          <Input
            borderWidth={2}
            value={name}
            onChangeText={(text) => setName(text)}
            placeholder="Full Name"
            focusBorderColor="yellow500"
          />
          <Input
            keyboardType="email-address"
            value={email}
            onChangeText={(text) => setEmail(text)}
            placeholder="E-mail"
          />
          <Input
            value={password}
            onChangeText={(text) => setPassword(text)}
            placeholder="Password"
            secureTextEntry={!showPassword}
            suffix={
              <TouchableOpacity
                onPress={() => setShowPassword((prev) => !prev)}
              >
                <Icon
                  name={showPassword ? "eye" : "eye-off"}
                  color="black"
                  fontFamily="Feather"
                />
              </TouchableOpacity>
            }
          />
          <CitySelector selectValue={province} setSelectedValue={setProvince} />
          <Button
            onPress={() => register(email, password)}
            w={"100%"}
            bg="darker"
            color="white"
            rounded="circle"
          >
            REGISTER WITH EMAIL
          </Button>
          <Text fontSize="xl" color="white" textAlign="center">
            Already a member?{" "}
            <Link style={styles.login} href="/login">
              Log in
            </Link>
          </Text>
        </Div>
        <Div h={10}></Div>
        <Snackbar ref={snackbarRef} bg="red600" color="white" />
      </KeyboardAvoidingView>
      <StatusBar style={"light"} />
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
