import React, { useEffect } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Button as But,
} from "react-native";
import auth from "@react-native-firebase/auth";

import HorizontalList from "../components/HorizontalList";
import { COLORS } from "../consts/colors";
import { signOut } from "../helpers/db";
import { DATA1, DATA2 } from "../helpers/dummyData";
const MainScreen = () => {
  useEffect(() => {
    console.log(auth().currentUser);
  }, []);
  return (
    <>
      <View
        style={{
          backgroundColor: COLORS.primary,
          height: 100,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text style={{ color: "white", fontSize: 22, marginTop: 30 }}>
          LES MEILLEURES RECETTES
        </Text>
      </View>
      <ScrollView style={{}}>
        <But title="Se deconecter" onPress={() => signOut()} />
        <HorizontalList DATA={DATA1} title="Les recettes de saison" />
        <HorizontalList DATA={DATA2} title="Les poissons" />
        <HorizontalList DATA={DATA2} title="Les salades du moment" />
      </ScrollView>
    </>
  );
};

export default MainScreen;

const styles = StyleSheet.create({});
