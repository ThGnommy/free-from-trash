import { Button, StyleSheet } from "react-native";
import React, { useContext } from "react";
import { useAuth } from "../../context/Auth";
import { Link, useSegments } from "expo-router";
import { Text, View } from "../../components/Themed";

const SignIn = () => {
  const { signIn } = useAuth();

  const segment = useSegments();

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text style={{ fontSize: 30 }}>Sign In Page</Text>
      <Button title="Sign in Here" onPress={signIn} />
      <Text>{JSON.stringify(segment)}</Text>
    </View>
  );
};

export default SignIn;

const styles = StyleSheet.create({});
