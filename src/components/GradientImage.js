import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { ImageBackground, StyleSheet, Text, View } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { COLORS } from "../consts/colors";

const GradientImage = ({
  source,
  height,
  width,
  style,
  text,
  titleStyle,
  children,
}) => {
  return (
    <ImageBackground
      style={{
        height,
        width,

        ...style,
        overflow: "hidden",
        justifyContent: "space-between",
        borderRadius: 15,
      }}
      source={source}
    >
      <LinearGradient
        colors={["rgba(0, 0, 0, 0)", "rgba(0, 0,0, 1)"]}
        start={{ x: 0, y: 1 }}
        end={{ x: 0, y: 0.7 }}
        style={{
          height: "30%",
        }}
      >
        <View
          style={{
            height: "70%",
            justifyContent: "space-between",
            paddingTop: 20,
          }}
        >
          <Text style={{ color: "white", fontSize: 20, alignSelf: "center" }}>
            Poulet a Thai
          </Text>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-evenly",
              alignItems: "center",
              marginHorizontal: 20,
            }}
          >
            <Text style={{ color: "white", textAlign: "center", flex: 1 / 3 }}>
              15 min de preparation
            </Text>
            <Text style={{ color: "white", textAlign: "center", flex: 1 / 3 }}>
              634 kcal
            </Text>
            <Text style={{ color: "white", textAlign: "center", flex: 1 / 3 }}>
              95% ont aime la recette
            </Text>
          </View>
        </View>
      </LinearGradient>
      <LinearGradient
        colors={["rgba(0, 0, 0, 0)", "rgba(0, 0,0, 1)"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 0.3 }}
        style={{
          height: "30%",
          justifyContent: "flex-end",
          alignItems: "center",
          paddingBottom: 10,
        }}
      >
        <View
          style={{ backgroundColor: COLORS.primary, height: 10, width: "100%" }}
        ></View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-evenly",
            width: "90%",
          }}
        >
          <View
            style={{
              height: 80,
              width: 80,
              borderRadius: 50,
              alignItems: "center",
              justifyContent: "center",
              borderWidth: 2,
              borderColor: "#EF5454",
            }}
          >
            <FontAwesome name="close" size={50} color="#EF5454" />
          </View>
          <View
            style={{
              height: 80,
              width: 80,
              borderRadius: 50,
              alignItems: "center",
              justifyContent: "center",
              borderWidth: 2,
              borderColor: COLORS.primary,
            }}
          >
            <FontAwesome name="heart" size={45} color={COLORS.primary} />
          </View>
        </View>
      </LinearGradient>
    </ImageBackground>
  );
};

export default GradientImage;

const styles = StyleSheet.create({
  imgText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 24,
    textAlign: "center",
    marginBottom: 10,
  },
});
