import React from "react";
import { StyleSheet, Text, View } from "react-native";

const ResultCart = ({ route }) => {
  const { cart } = route.params;

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text style={{ fontSize: 20, fontWeight: "bold" }}>
        This is your cart
      </Text>
      {cart?.map((text) => {
        return (
          <Text
            key={text}
            style={{
              marginVertical: 10,
              marginHorizontal: 30,
              fontSize: 18,
            }}
          >
            {text}
          </Text>
        );
      })}
    </View>
  );
};

export default ResultCart;

const styles = StyleSheet.create({});
