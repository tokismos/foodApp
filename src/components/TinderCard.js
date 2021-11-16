import { LinearGradient } from "expo-linear-gradient";
import React, { useEffect } from "react";
import {
  ImageBackground,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Alert,
  Pressable,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { COLORS } from "../consts/colors";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";

const TinderCard = ({ recipe, onSwipeRight, onSwipeLeft }) => {
  const navigation = useNavigation();

  const { nbrOfRecipes, matches } = useSelector((state) => state.matchStore);
  //The progress bar
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

  return (
    <>
      <Pressable
        style={{ height: "100%", width: "100%" }}
        onPress={() =>
          navigation.navigate("IngredientScreen", { recipe: recipe })
        }
      >
        <ImageBackground style={styles.image} source={{ uri: recipe?.imgURL }}>
          <LinearGradient
            colors={["rgba(0, 0, 0, 0)", "rgba(0, 0,0, 1)"]}
            start={{ x: 0, y: 1 }}
            end={{ x: 0, y: 0.7 }}
            style={{
              height: "30%",
            }}
          >
            <View style={styles.headerContainer}>
              <Text style={styles.title}>{recipe?.name}</Text>
              <View style={styles.descriptionContainer}>
                <Text
                  style={{ color: "white", textAlign: "center", flex: 1 / 3 }}
                >
                  15 min de preparation
                </Text>
                <Text
                  style={{ color: "white", textAlign: "center", flex: 1 / 3 }}
                >
                  634 kcal
                </Text>
                <Text
                  style={{ color: "white", textAlign: "center", flex: 1 / 3 }}
                >
                  95% ont aime la recette
                </Text>
              </View>
            </View>
          </LinearGradient>
          <LinearGradient
            colors={["rgba(0, 0, 0, 0)", "rgba(0, 0,0, 1)"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 0.3 }}
            style={styles.gradient}
          >
            {/* {
              <View style={styles.progressContainer}>
                <ProgressView />
              </View>
            } */}
            <View style={styles.buttonContainer}>
              <TouchableOpacity onPress={onSwipeLeft} style={styles.leftButton}>
                <FontAwesome name="close" size={50} color="#EF5454" />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={onSwipeRight}
                style={[styles.leftButton, { borderColor: COLORS.primary }]}
              >
                <FontAwesome name="heart" size={45} color={COLORS.primary} />
              </TouchableOpacity>
            </View>
          </LinearGradient>
        </ImageBackground>
      </Pressable>
    </>
  );
};

export default TinderCard;

const styles = StyleSheet.create({
  imgText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 24,
    textAlign: "center",
    marginBottom: 10,
  },
  image: {
    height: "100%",
    width: "100%",

    overflow: "hidden",
    justifyContent: "space-between",
    borderRadius: 15,
  },
  headerContainer: {
    height: "70%",
    justifyContent: "space-between",
    paddingTop: 0,
  },
  descriptionContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    marginHorizontal: 20,
  },
  gradient: {
    height: "30%",
    justifyContent: "flex-end",
    alignItems: "center",
    paddingBottom: 10,
  },
  progressContainer: {
    flexDirection: "row",
    width: "100%",
    marginVertical: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    width: "90%",
  },
  leftButton: {
    height: 80,
    width: 80,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: "#EF5454",
  },
  title: {
    color: "white",
    fontSize: 20,
    textAlign: "center",
    marginTop: 10,
  },
});
