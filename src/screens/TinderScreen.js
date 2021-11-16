import React, { useEffect, useRef, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Button,
  Image,
} from "react-native";
import TinderCard from "../components/TinderCard";
import users from "../helpers/data/";
import { AntDesign, Entypo } from "@expo/vector-icons";

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
import HeaderComponent from "../components/HeaderComponent";

const Header = () => {
  return (
    <View
      style={{
        flexDirection: "row",
        height: "10%",
        width: "100%",
        marginTop: 10,
      }}
    >
      <View
        style={{
          width: "30%",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Image
          source={require("../assets/avatar.png")}
          style={{
            height: "80%",
            width: "100%",
            resizeMode: "contain",
            padding: 20,
          }}
        />
      </View>
      <View style={{ width: "40%" }}>
        <Image
          source={require("../assets/logo.png")}
          style={{
            height: "100%",
            width: "100%",
            resizeMode: "contain",
            marginLeft: -10,
          }}
        />
      </View>
      <View
        style={{
          width: "30%",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <View
          style={{
            backgroundColor: COLORS.primary,
            width: "80%",
            height: "80%",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 10,
          }}
        >
          <Text
            style={{
              color: "white",
              fontSize: 16,
              textAlign: "center",
              fontWeight: "bold",
            }}
          >
            FeedBack Nous
          </Text>
        </View>
      </View>
    </View>
  );
};
const BarHeader = () => {
  return (
    <View
      style={{
        height: "5%",
        width: "100%",
        flexDirection: "row",
        backgroundColor: "#f5f4f4",
      }}
    >
      <View
        style={{
          width: "75%",
          height: "100%",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          paddingHorizontal: 10,
          borderBottomRightRadius: 10,
          borderBottomLeftRadius: 10,
          backgroundColor: "white",
        }}
      >
        <Entypo name="home" size={24} color="black" />
        <Text>Avenue Jomini 5,Lausagne,1004</Text>
        <AntDesign name="downcircleo" size={15} color={COLORS.primary} />
      </View>
      <View
        style={{
          width: "25%",
          height: "100%",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "row",
          backgroundColor: "white",
          marginLeft: 1,
          borderBottomLeftRadius: 10,
        }}
      >
        <Image
          source={require("../assets/marcher.png")}
          style={{
            resizeMode: "contain",
            aspectRatio: 1,
            height: "30%",
            width: "30%",
          }}
        />
        <AntDesign name="downcircleo" size={15} color={COLORS.primary} />
      </View>
    </View>
  );
};
const TinderScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const { nbrOfRecipes, matches } = useSelector((state) => state.matchStore);
  const { recipes, activeFilters } = useSelector((state) => state.recipeStore);

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
  const BottomContainer = () => {
    return (
      <View
        style={{
          width: "100%",
          height: "10%",
          flexDirection: "row",
          justifyContent: "center",
        }}
      >
        <View
          style={{
            width: "80%",
            alignSelf: "center",
            flexDirection: "row",
            justifyContent: "space-evenly",
          }}
        >
          <View style={{ alignItems: "center" }}>
            <Image source={require("../assets/recette.png")} />
            <Text style={{ color: "#cccccc" }}>Recettes</Text>
          </View>
          <View style={{ alignItems: "center" }}>
            <Image source={require("../assets/cuisine.png")} />
            <Text style={{ color: "#cccccc" }}>Cuisine</Text>
          </View>
          <View style={{ alignItems: "center" }}>
            <AntDesign name="pluscircle" size={50} color="#cccccc" />
            <Text style={{ color: "#cccccc" }}>Ajouter</Text>
          </View>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.pageContainer}>
      <Header />
      <BarHeader />
      <HeaderComponent yes page="1" style={{ justifyContent: "center" }} />
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
          <View style={{ height: "63%", width: "100%" }}>
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
          {matches.length > 1 ? (
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
          ) : (
            <BottomContainer />
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
    backgroundColor: "#f5f4f4",
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
