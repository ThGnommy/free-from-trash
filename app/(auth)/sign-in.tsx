import {
  StyleSheet,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  TextInput,
  Pressable,
  TouchableOpacity,
} from "react-native";
import React, {
  createRef,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { useAuth } from "../../context/Auth";
import { Link, useRouter, useSegments } from "expo-router";
import { Button, Div, Icon, Input, Snackbar, Text } from "react-native-magnus";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../../firebaseInit";
import BackgroundVideo from "./components/BackgroundVideo";

const Signin = () => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const register = async (email: string, password: string) => {
    const placeholderAvatar =
      "https://todaysmama.com/.image/t_share/MTU5OTA4ODA1NTYyNDEwMzU5/image-placeholder-title.jpg";

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      await updateProfile(userCredential.user, {
        displayName: name,
        photoURL: placeholderAvatar,
      }).catch((error) => {
        throw new Error(error.message);
      });
    } catch (error) {
      if (error instanceof Error) {
        snackbarRef.current.show(error.message);
        throw new Error(error.message);
      }
    }
  };

  const snackbarRef = createRef<any>();

  return (
    <SafeAreaView style={styles.container}>
      <BackgroundVideo />
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
            style={styles.input}
            borderWidth={2}
            value={name}
            onChangeText={(text) => setName(text)}
            placeholder="Full Name"
            focusBorderColor="yellow500"
          />
          <Input
            style={styles.input}
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
        <Snackbar ref={snackbarRef} bg="red600" color="white" />
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
  input: {
    // backgroundColor: "transparent",
  },
});
