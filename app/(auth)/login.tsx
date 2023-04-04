import { KeyboardAvoidingView, Platform, StyleSheet } from "react-native";
import React, { useState } from "react";
import { Div, Input, Text, Button } from "react-native-magnus";
import { Link } from "expo-router";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebaseInit";

const Login = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const login = async (email: string, password: string) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  };

  return (
    <Div>
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
            onPress={() => login(email, password)}
            w={"100%"}
            bg="white"
            rounded="circle"
            color="black"
          >
            LOGIN WITH EMAIL
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
    </Div>
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
