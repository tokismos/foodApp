import {
  CardStyleInterpolators,
  createStackNavigator,
  TransitionPresets,
  TransitionSpecs,
} from "@react-navigation/stack";
import React from "react";
import { Animated, StyleSheet, Text, View } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  Ionicons,
  MaterialCommunityIcons,
  FontAwesome,
} from "@expo/vector-icons";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

import FirstPage from "../screens/FirstPage";
import MainScreen from "../screens/MainScreen";
import OnBoardingScreen from "../screens/OnBoardingScreen";
import { COLORS } from "../consts/colors";
import IngredientScreen from "../screens/IngredientScreen";
import LoginScreen from "../screens/LoginScreen";
import SignUpScreen from "../screens/SignUpScreen";
import PhoneVerificationScreen from "../screens/PhoneVerificationScreen";
import FirstScreen from "../screens/FirstScreen";
import CartScreen from "../screens/CartScreen";
import ResultCart from "../screens/ResultCart";
import RecetteSVG from "../assets/recette.svg";
import { color } from "react-native-reanimated";
import RecipeScreen from "../screens/RecipeScreen";
import TinderScreen from "../screens/TinderScreen";
import filterScreen from "../screens/filterScreen";
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const TopTab = createMaterialTopTabNavigator();

const TopTabScreen = () => {
  return (
    <TopTab.Navigator>
      <TopTab.Screen name="Recipe Screen" component={RecipeScreen} />
      <TopTab.Screen name="Recipe Screesn" component={FirstScreen} />
    </TopTab.Navigator>
  );
};

const TabScreen = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: COLORS.primary,
        tabBarInactiveTintColor: "black",
        tabBarStyle: {
          height: 50,
        },
        tabBarLabelStyle: {
          // color: "black",
        },
      }}
    >
      <Tab.Screen
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="silverware-fork-knife" size={30} />
          ),
        }}
        name="TopTabScreen"
        component={TinderScreen}
      />

      <Tab.Screen
        options={{
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="search" size={24} />
          ),
        }}
        name="Recherche"
        component={FirstPage}
      />
      <Tab.Screen
        options={{
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="heart" size={24} />
          ),
        }}
        name="Favoris"
        component={IngredientScreen}
      />
      <Tab.Screen
        options={{
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="shopping-cart" size={24} />
          ),
        }}
        name="Panier"
        component={IngredientScreen}
      />
    </Tab.Navigator>
  );
};
const Navigator = () => {
  // to add transition effect
  const horizontalAnimation = {
    cardStyleInterpolator: ({
      current,
      layouts: { screen },
      next,
      inverted,
    }) => {
      const progress = Animated.add(
        current.progress.interpolate({
          inputRange: [0, 1],
          outputRange: [0, 1],
          extrapolate: "clamp",
        }),
        next
          ? next.progress.interpolate({
              inputRange: [0, 1],
              outputRange: [0, 1],
              extrapolate: "clamp",
            })
          : 0
      );
      return {
        cardStyle: {
          transform: [
            {
              translateX: Animated.multiply(
                progress.interpolate({
                  inputRange: [0, 1, 2],
                  outputRange: [
                    screen.width, // Focused, but offscreen in the beginning
                    0, // Fully focused
                    -screen.width, // Fully unfocused
                  ],
                  extrapolate: "clamp",
                }),
                inverted
              ),
            },
          ],
        },
      };
    },
  };
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        options={{}}
        name="OnBoardingScreen"
        component={TabScreen}
      />
      <Stack.Screen options={{}} name="LoginScreen" component={LoginScreen} />
      <Stack.Screen name="IngredientScreen" component={IngredientScreen} />
      <Stack.Screen
        name="filterScreen"
        options={{ ...horizontalAnimation }}
        component={filterScreen}
      />
      <Stack.Screen name="SignUpScreen" component={SignUpScreen} />
      <Stack.Screen name="CartScreen" component={CartScreen} />
      <Stack.Screen name="ResultCartScreen" component={ResultCart} />
      <Stack.Screen
        name="PhoneVerificationScreen"
        options={{ ...horizontalAnimation }}
        component={PhoneVerificationScreen}
      />
    </Stack.Navigator>
  );
};
export default Navigator;
const styles = StyleSheet.create({});
