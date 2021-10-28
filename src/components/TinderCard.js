import { LinearGradient } from "expo-linear-gradient";
import React, { useEffect, useState } from "react";
import {
  ImageBackground,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Alert,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { COLORS } from "../consts/colors";
import { useSelector, useDispatch } from "react-redux";
import { addMatch } from "../redux/slicer/MatchSlicer";
const Card = ({ recipe, onSwipeRight, onSwipeLeft }) => {
  const { nbrOfRecipes, matches } = useSelector((state) => state.matchStore);
  const ProgressView = () => {
    return Array.apply(null, Array(nbrOfRecipes)).map((item, index) => {
      return (
        <View
          key={index}
          style={{
            backgroundColor: index < matches.length ? COLORS.primary : "white",
            height: 10,
            flexGrow: 1 / nbrOfRecipes,
            marginHorizontal: 1,
          }}
        />
      );
    });
  };

  useEffect(() => {
    if (matches.length == nbrOfRecipes) {
      Alert.alert("You completed your matches", matches.toString(), [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        { text: "OK", onPress: () => console.log("OK Pressed") },
      ]);
    }
  }, [matches]);
  useEffect(() => {
    console.log("nbrOfRecipes", nbrOfRecipes);
  }, [matches]);
  return (
    <ImageBackground
      style={{
        height: "100%",
        width: "100%",

        overflow: "hidden",
        justifyContent: "space-between",
        borderRadius: 15,
      }}
      source={{ uri: recipe?.imgURL }}
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
            {recipe?.name}
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
        {
          <View
            style={{
              flexDirection: "row",
              width: "100%",
              marginVertical: 10,
            }}
          >
            <ProgressView />
          </View>
        }
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-evenly",
            width: "90%",
          }}
        >
          <TouchableOpacity
            onPress={onSwipeLeft}
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
          </TouchableOpacity>
          <TouchableOpacity
            onPress={onSwipeRight}
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
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </ImageBackground>
  );
};

export default Card;

const styles = StyleSheet.create({
  imgText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 24,
    textAlign: "center",
    marginBottom: 10,
  },
});
