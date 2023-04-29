import { StyleSheet, ViewStyle } from "react-native";
import React, { useId } from "react";
import { Div, Avatar, Text, DivProps } from "react-native-magnus";

interface UserProps extends DivProps {
  name: string;
  photoURL: string;
  score: number;
}

const User = ({ name, photoURL, score, ...rest }: UserProps) => {
  const userId = useId();

  return (
    <Div key={userId} {...rest}>
      <Div row alignItems="center" style={{ gap: 10 }}>
        <Avatar size={40} source={{ uri: photoURL || "" }} />
        <Text fontSize="xl">{name}</Text>
      </Div>
      <Text fontSize="xl">{score}</Text>
    </Div>
  );
};

export default User;

const styles = StyleSheet.create({});
