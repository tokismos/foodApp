import React from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Button as But,
} from "react-native";
import { Button } from "react-native-elements/dist/buttons/Button";
import HorizontalList from "../components/HorizontalList";
import { COLORS } from "../consts/colors";
import { DATA1, DATA2 } from "../helpers/dummyData";
import { signOut } from "../helpers/db";
const MainScreen = () => {
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
