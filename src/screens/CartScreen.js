import React from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { COLORS } from "../consts/colors";

const { height, width } = Dimensions.get("window");

const IngredientItem = () => {
  return (
    <View style={{ backgroundColor: "red", flexDirection: "row" }}>
      <Text>Creme freche</Text>
    </View>
  );
};

const CartScreen = () => {
  return (
    <View style={{ flex: 1, backgroundColor: COLORS.secondary }}>
      <View style={{ height: height * 0.15 }}>
        <View
          style={{
            height: "50%",
            justifyContent: "center",
            backgroundColor: COLORS.primary,
          }}
        >
          <Text
            style={{
              fontSize: 20,
              color: "white",
              textAlign: "center",
            }}
          >
            Your Ingredient
          </Text>
        </View>
        <View
          style={{
            backgroundColor: COLORS.secondary,
            height: "50%",
            justifyContent: "center",
            paddingLeft: 10,
          }}
        >
          <AntDesign name="arrowleft" size={30} color="black" />
        </View>
      </View>
      <View>
        <Text
          style={{
            fontSize: 18,
            fontWeight: "bold",
            marginLeft: 20,
          }}
        >
          Vous souhaitez faire courses pour les recette suivantes:
        </Text>
        <Text
          style={{
            fontSize: 14,
            color: "grey",
            padding: 20,
            textAlign: "justify",
          }}
        >
          Si vous vous trompez, vous pourrez rajouter ou enlever un ingrédient
          sur le site de votre supermarché
        </Text>
        <IngredientItem />
      </View>
    </View>
  );
};

export default CartScreen;

const styles = StyleSheet.create({});
