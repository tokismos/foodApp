import React, { useState } from "react";
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import CheckBox from "@react-native-community/checkbox";

const { width, height } = Dimensions.get("screen");
const CartComponent = ({ item }) => {
  const [toggleCheckBox, setToggleCheckBox] = useState(false);

  return (
    <>
      <TouchableOpacity style={styles.container}>
        <View style={styles.imgContainer}>
          <Image
            source={{ uri: item.imgURL }}
            style={{ height: "90%", width: "90%", borderRadius: 10 }}
          />
        </View>
        <View style={styles.midContainer}>
          <View style={{ flexShrink: 1, marginLeft: -5 }}>
            <Text
              style={{ fontSize: 16, fontWeight: "bold", marginBottom: 5 }}
              numberOfLines={1}
            >
              {item.name}
            </Text>
            <Text style={{ color: "gray" }}>
              {item.tempsPreparation} min de preparation
            </Text>
            <Text style={{ color: "gray", fontSize: 14 }}>
              {item.ingredients.length} d'ingredients
            </Text>
          </View>
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text style={{ fontSize: 12 }}>4 personnes</Text>
          </View>
        </View>
        <View
          style={{
            width: "10%",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <CheckBox disabled={false} value={true} onValueChange={{}} />
        </View>
      </TouchableOpacity>
      <View
        style={{
          height: 0.4,
          width: "80%",
          alignSelf: "center",
          backgroundColor: "gray",
        }}
      />
    </>
  );
};

export default CartComponent;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    height: height * 0.1,
    width,
    marginVertical: 7,
  },
  imgContainer: {
    width: "25%",
    justifyContent: "center",
    padding: 3,
  },
  midContainer: {
    width: "65%",
    justifyContent: "center",
    flexDirection: "row",
    alignItems: "center",
  },
});
