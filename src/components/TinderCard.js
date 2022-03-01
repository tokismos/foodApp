import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  Image,
  View,
  TouchableOpacity,
  Alert,
  Pressable,
} from "react-native";
import { COLORS } from "../consts/colors";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import FastImage from "react-native-fast-image";
import { Feather, FontAwesome, MaterialIcons } from "@expo/vector-icons";
import { Avatar } from "react-native-paper";

const Imagee = ({ uri, setLoaded }) => {
  return (
    <FastImage
      style={{ ...styles.image }}
      source={{ uri, priority: FastImage.priority.high }}
      resizeMode={FastImage.resizeMode.cover}
    />
  );
};

const HeadComponent = ({ name, like }) => {
  return (
    <View style={styles.headComponent}>
      <View style={styles.leftHeaderComponent}>
        <Avatar.Image size={50} source={require("../assets/avatar.png")} />
        <View style={{ flex: 1 }}>
          <Text numberOfLines={2} style={styles.titleName}>
            {name}
          </Text>
          <Text style={{ color: "gray", marginLeft: 5, fontSize: 12 }}>
            Créé par Yuzu
          </Text>
        </View>
      </View>
      <View style={styles.rightHeaderComponent}>
        <View style={{ alignItems: "center" }}>
          <FontAwesome name="heart" size={25} color={COLORS.primary} />
          <Text style={styles.nbrHeader}>{like}%</Text>
        </View>
        <View style={{ alignItems: "center" }}>
          <FontAwesome name="star" size={25} color={COLORS.primary} />
          <Text style={styles.nbrHeader}>3,5</Text>
        </View>
      </View>
    </View>
  );
};

const TinderCard = ({ recipe, onSwipeRight, onSwipeLeft }) => {
  const navigation = useNavigation();

  return (
    <>
      <Pressable
        style={{
          height: "100%",
          width: "100%",
        }}
      >
        <HeadComponent
          name={recipe.name}
          like={parseInt(
            (recipe.stats.nbrRight * 100) /
              (recipe.stats.nbrLeft + recipe.stats.nbrRight)
          )}
        />

        <Imagee uri={recipe?.imgURL} />
        <View
          style={{
            backgroundColor: COLORS.darkGray,
            height: "22%",
            justifyContent: "center",
            marginTop: -3,
          }}
        >
          <View
            style={{
              backgroundColor: "black",
              height: "40%",
              width: "90%",
              alignSelf: "center",
              borderRadius: 5,
              padding: 10,
              justifyContent: "center",
            }}
          >
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <Text style={{ color: "white" }}>
                Temps Préparation :{" "}
                <Text style={{ fontWeight: "bold" }}>
                  {" "}
                  {recipe.tempsPreparation} min{" "}
                </Text>
              </Text>
              <Text style={{ color: "white", fontWeight: "bold" }}>
                {recipe.difficulty}
              </Text>
            </View>
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <Text style={{ color: "white" }}>
                Temps total :
                <Text style={{ fontWeight: "bold" }}>
                  {" "}
                  {recipe.tempsPreparation + recipe.tempsCuisson} min
                </Text>
              </Text>
              <Text style={{ color: "white" }}>
                <Text style={{ fontWeight: "bold" }}>
                  {" "}
                  {recipe.ingredients.length}{" "}
                </Text>{" "}
                ingrédients
              </Text>
            </View>
          </View>

          <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={onSwipeLeft} style={styles.leftButton}>
              <FontAwesome name="close" size={30} color={COLORS.red} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("IngredientScreen", { recipe });
              }}
              style={{
                height: "100%",
                width: "20%",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Feather name="info" size={40} color="white" />
              <MaterialIcons
                name="keyboard-arrow-down"
                size={30}
                color="white"
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={onSwipeRight}
              style={[styles.leftButton, { borderColor: COLORS.primary }]}
            >
              <FontAwesome name="heart" size={30} color={COLORS.primary} />
            </TouchableOpacity>
          </View>
        </View>
      </Pressable>
    </>
  );
};

export default TinderCard;

const styles = StyleSheet.create({
  image: {
    aspectRatio: 1,
  },

  buttonContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    width: "90%",
    height: "50%",
    alignSelf: "center",
    marginTop: 5,
  },
  leftButton: {
    height: 60,
    width: 60,
    borderRadius: 35,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: COLORS.red,
  },

  headComponent: {
    backgroundColor: COLORS.darkGray,
    height: "11%",
    flexDirection: "row",
    alignItems: "center",
    borderTopRightRadius: 15,
    borderTopLeftRadius: 15,
    justifyContent: "center",
    paddingHorizontal: 10,
    marginBottom: -3,
  },
  leftHeaderComponent: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    width: "80%",
  },
  titleName: {
    marginLeft: 5,
    color: "white",
    fontWeight: "bold",
    width: "100%",
    fontSize: 15,
  },
  nbrHeader: { color: "white", fontWeight: "bold" },
  rightHeaderComponent: {
    flexDirection: "row",
    width: "20%",
    justifyContent: "space-around",
  },
});
