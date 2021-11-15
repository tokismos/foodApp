import CheckBox from "@react-native-community/checkbox";
import React, { useEffect, useState } from "react";
import { Image, TouchableOpacity } from "react-native";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { COLORS } from "../consts/colors";

const IngredientCartScreen = ({ route }) => {
  const { cart } = route.params;
  let finalCart = {};
  const IngredientItemComponent = ({ item }) => {
    const [toggle, setToggle] = useState(true);
    return (
      <TouchableOpacity
        style={{
          flexDirection: "row",
          width: "95%",
          justifyContent: "space-between",
          alignSelf: "center",
          alignItems: "center",
        }}
      >
        <Text style={{ marginLeft: 20, width: "80%" }}>
          {item.quantity} {item.name}
        </Text>
        <CheckBox
          value={toggle}
          onValueChange={(newValue) => setToggle(!newValue)}
        />
      </TouchableOpacity>
    );
  };
  const CartItemComponent = ({ item }) => {
    return (
      <>
        <View
          style={{
            flexDirection: "row",
            marginVertical: 10,
          }}
        >
          <View style={{ width: "15%", height: "20%", paddingLeft: 5 }}>
            <Image
              source={{ uri: item.imgURL }}
              style={{ aspectRatio: 1, borderRadius: 10 }}
            />
          </View>
          <View style={{ width: "85%" }}>
            <Text style={{ margin: 10, fontSize: 16, fontWeight: "bold" }}>
              {item.name}
            </Text>
            {item.ingredients.map((elmt, index) => (
              <IngredientItemComponent item={elmt} key={index} />
            ))}
          </View>
        </View>
        <View
          style={{
            width: "90%",
            height: 0.4,
            backgroundColor: "gray",
            alignSelf: "center",
          }}
        />
      </>
    );
  };
  //   useEffect(() => {
  //     cart.map((item) => {
  //       [finalCart.name] = item.name;
  //       [finalCart.ingredients] = item.ingredients;
  //     });
  //   }, [cart]);
  //   useEffect(() => {
  //     console.log("this is fiiiinal", finalCart);
  //   }, [finalCart]);
  return (
    <View style={{ alignItems: "center", flex: 1, backgroundColor: "white" }}>
      <ScrollView style={{ flex: 1 }}>
        <View style={{ width: "100%" }}>
          <Text
            style={{
              textAlign: "center",
              fontSize: 22,
              fontWeight: "bold",
              margin: 10,
            }}
          >
            Les ingredients
          </Text>
          {cart.map((item, index) => (
            <CartItemComponent item={item} key={index} />
          ))}
        </View>
      </ScrollView>
      <View
        style={{
          height: "10%",
          width: "100%",
          justifyContent: "space-evenly",
          alignItems: "center",
        }}
      >
        <TouchableOpacity
          style={{ ...styles.buttonContainer, backgroundColor: COLORS.primary }}
        >
          <Text style={{ fontWeight: "bold", color: "white", fontSize: 18 }}>
            Valider les recettes
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default IngredientCartScreen;

const styles = StyleSheet.create({
  buttonContainer: {
    backgroundColor: "#E3E3E3",

    height: "80%",
    width: "80%",
    justifyContent: "center",
    alignItems: "center",
  },
});
