import React, { useEffect, useRef, useState } from "react";
import { View, StyleSheet, Text, TouchableOpacity, Button } from "react-native";
import TinderCard from "../components/TinderCard";
import users from "../helpers/data/";

import AnimatedStack from "../components/AnimatedStack";
import { useDispatch, useSelector } from "react-redux";
import { addMatch, changeNumberOfRecipes } from "../redux/slicer/MatchSlicer";
import { COLORS } from "../consts/colors";
import { TextInput } from "react-native-gesture-handler";
import { FontAwesome5 } from "@expo/vector-icons";
import { getAllRecipes } from "../axios";
import { setRecipes } from "../redux/slicer/recipeSlicer";
import data from "../helpers/data";
import LoadingComponent from "../components/LoadingComponent";
import { LoginWithFb, signOut } from "../helpers/db";

const TinderScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const { nbrOfRecipes, matches } = useSelector((state) => state.matchStore);
  const { recipes, activeFilters } = useSelector((state) => state.recipeStore);
  const NbrMatchComponent = () => {
    return (
      <View style={styles.nbrContainer}>
        <Text style={{ width: "50%" }}>
          Combien de repas voulez vous cuisiner cette semaine
        </Text>
        <View
          style={{
            height: "60%",
            justifyContent: "space-between",
          }}
        >
          <TextInput
            style={styles.TextInput}
            placeholder="Number"
            onChangeText={setNbrReciepe}
          />
          <TouchableOpacity
            onPress={() => dispatch(changeNumberOfRecipes(+nbrRecipe))}
            style={styles.buttonContainer}
          >
            <Text>Valider</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const loadData = async (item) => {
    const recipesData = await getAllRecipes(item);
    dispatch(setRecipes(recipesData));
  };
  useEffect(() => {
    loadData(activeFilters);
  }, [activeFilters]);

  const onSwipeLeft = (item) => {
    // console.warn("swipe left", user.name);
    console.log("swiped left", item);
  };

  const onSwipeRight = (item) => {
    dispatch(addMatch(item));
    console.log("thiiis is item", item);
    // console.warn("swipe right: ", user.name);
    console.log("swiped right", item);
  };

  return (
    <View style={styles.pageContainer}>
      {/* <NbrMatchComponent /> */}
      {/* <View style={[styles.headerContainer, { height: "10%" }]}>
        <TouchableOpacity onPress={() => navigation.navigate("FilterScreen")}>
          <FontAwesome5 name="filter" size={24} color="white" />
        </TouchableOpacity>
      </View> */}
      {recipes == null ? (
        <LoadingComponent />
      ) : (
        <>
          <View style={{ height: "85%", width: "100%" }}>
            <AnimatedStack
              data={recipes}
              renderItem={({ item, onSwipeRight, onSwipeLeft }) => (
                <TinderCard
                  height="100%"
                  width="100%"
                  recipe={item}
                  onSwipeRight={onSwipeRight}
                  onSwipeLeft={onSwipeLeft}
                />
              )}
              onSwipeLeft={onSwipeLeft}
              onSwipeRight={onSwipeRight}
            />
          </View>
          {matches.length > 1 && (
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate("PanierScreen")}
              >
                <Text
                  style={{ fontSize: 20, color: "white", fontWeight: "bold" }}
                >
                  Voir le panier{" "}
                  {matches.length != 0 ? `(${matches.length})` : null}
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  pageContainer: {
    alignItems: "center",
    flex: 1,
    width: "100%",
    backgroundColor: "white",
    paddingTop: 10,
  },
  container: {
    flex: 1,
    padding: 24,
    justifyContent: "center",
    backgroundColor: "grey",
  },
  contentContainer: {
    flex: 1,
    alignItems: "center",
  },
  nbrContainer: {
    backgroundColor: COLORS.primary,
    height: "15%",
    width: "90%",
    flexDirection: "row",
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
  },
  TextInput: {
    borderWidth: 1,
    backgroundColor: "white",
    borderRadius: 5,
    padding: 3,
  },
  buttonContainer: {
    height: "10%",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  headerContainer: {
    backgroundColor: COLORS.primary,
    height: "10%",
    width: "100%",
    alignItems: "flex-end",
    justifyContent: "center",
    paddingRight: 20,
    marginTop: 40,
  },
  button: {
    backgroundColor: COLORS.primary,
    width: "70%",
    height: "80%",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default TinderScreen;
