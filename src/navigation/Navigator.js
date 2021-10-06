import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

import FirstPage from "../screens/FirstPage";
import MainScreen from "../screens/MainScreen";
import OnBoardingScreen from "../screens/OnBoardingScreen";
import { COLORS } from "../consts/colors";
import IngredientScreen from "../screens/IngredientScreen";
import LoginScreen from "../screens/LoginScreen";
import SignUpScreen from "../screens/SignUpScreen";

const Stack = createNativeStackNavigator();
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
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen options={{}} name="HomeScreen" component={LoginScreen} />
      <Stack.Screen name="IngredientScreen" component={IngredientScreen} />
      <Stack.Screen name="SignUpScreen" component={SignUpScreen} />
    </Stack.Navigator>
  );
};
export default Navigator;
const styles = StyleSheet.create({});
