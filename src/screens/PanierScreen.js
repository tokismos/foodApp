import React, { useState } from "react";
import {
  Button,
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useSelector } from "react-redux";
import CartComponent from "../components/CartComponent";
import { COLORS } from "../consts/colors";
const { width, height } = Dimensions.get("screen");

const PanierScreen = ({ navigation }) => {
  const { matches } = useSelector((state) => state.matchStore);
  const [finalCart, setFinalCart] = useState([]);
  console.log("thiiiiis matches", matches);
  const validate = () => {
    console.log("hiii");
    navigation.navigate("IngredientsCartScreen");
  };

  return (
    <View style={styles.mainContainer}>
      <View style={styles.headerContainer}></View>
      <ScrollView style={{ flex: 1 }}>
        <View style={{ height: "65%", width: "100%" }}>
          <Text style={styles.title}>Les recettes selectionnes:</Text>
          <View style={{ flexGrow: 1 }}>
            {matches.map((item) => (
              <CartComponent item={item} key={item.name} />
            ))}
          </View>
        </View>
      </ScrollView>

      <View style={styles.bottomContainer}>
        <TouchableOpacity style={styles.buttonContainer}>
          <Text>Ajouter d'autres recettes</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonContainer} onPress={validate}>
          <Text>Valider les recettes</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default PanierScreen;

const styles = StyleSheet.create({
  buttonContainer: {
    backgroundColor: "#E3E3E3",

    height: "40%",
    width: "80%",
    justifyContent: "center",
    alignItems: "center",
  },
  mainContainer: {
    height,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 22,
    textAlign: "center",
    fontWeight: "bold",
    marginVertical: 15,
  },
  bottomContainer: {
    height: "20%",
    width: "100%",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  headerContainer: { backgroundColor: "red", height: "15%", width: "100%" },
});
