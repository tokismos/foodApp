import {
  CardStyleInterpolators,
  createStackNavigator,
  TransitionPresets,
  TransitionSpecs,
} from "@react-navigation/stack";
import React from "react";
import { Animated, StyleSheet, Text, View } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

import FirstPage from "../screens/FirstPage";
import MainScreen from "../screens/MainScreen";
import OnBoardingScreen from "../screens/OnBoardingScreen";
import { COLORS } from "../consts/colors";
import IngredientScreen from "../screens/IngredientScreen";
import LoginScreen from "../screens/LoginScreen";
import SignUpScreen from "../screens/SignUpScreen";
import PhoneVerificationScreen from "../screens/PhoneVerificationScreen";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

export const TabScreen = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarOptions: { activeTintColor: "red" },
        tabBarStyle: {
          backgroundColor: COLORS.primary,
          height: 60,
        },
      }}
    >
      <Tab.Screen
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="fast-food" size={30} color="white" />
          ),
        }}
        name="Home"
        component={MainScreen}
      />
      <Tab.Screen name="Settings" component={FirstPage} />
      <Tab.Screen name="test" component={IngredientScreen} />
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
        component={OnBoardingScreen}
      />
      <Stack.Screen options={{}} name="LoginScreen" component={LoginScreen} />
      <Stack.Screen name="IngredientScreen" component={IngredientScreen} />
      <Stack.Screen name="SignUpScreen" component={SignUpScreen} />
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
