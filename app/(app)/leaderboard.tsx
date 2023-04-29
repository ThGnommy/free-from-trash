import { FlatList, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import { Div, DivProps, ScrollDiv, Text } from "react-native-magnus";
import { ICreator } from "../../context/types";
import { getDocs, collection, query, orderBy } from "firebase/firestore";
import { db } from "../../firebaseInit";
import User from "./components/Leaderboard/User";

interface UserProps {
  item: {
    name: string;
    photoURL: string;
    score: number;
  };
  index: number;
}

const Leaderboard = () => {
  const [allUser, setAllUser] = useState<ICreator[] | null>();

  const getAllUser = async () => {
    const userRef = collection(db, "users");

    const q = query(userRef, orderBy("score", "desc"));

    const querySnapshot = await getDocs(q);

    const temp: ICreator[] = [];

    querySnapshot.forEach((doc) => {
      temp.push(doc.data() as ICreator);
    });

    setAllUser(temp);
  };

  useEffect(() => {
    getAllUser();
  }, []);

  const ListHeader = (
    <Div row justifyContent="space-between" alignItems="center" p={10}>
      <Text fontSize="2xl">User</Text>
      <Text fontSize="2xl">Score</Text>
    </Div>
  );

  return (
    <Div flex={1} bg="white">
      <FlatList
        data={allUser}
        renderItem={({ item, index }: UserProps) => (
          <User
            bg={index % 2 ? "white" : "gray200"}
            row
            justifyContent="space-between"
            alignItems="center"
            p={5}
            style={{ gap: 10 }}
            name={item.name}
            photoURL={item.photoURL}
            score={item.score}
          />
        )}
        ListHeaderComponent={ListHeader}
      />
    </Div>
  );
};

export default Leaderboard;

const styles = StyleSheet.create({});
