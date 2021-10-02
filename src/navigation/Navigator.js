import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import FirstPage from "../screens/FirstPage";
import MainScreen from "../screens/MainScreen";
import OnBoardingScreen from "../screens/OnBoardingScreen";

const Stack = createNativeStackNavigator();

const Navigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={FirstPage} />
      <Stack.Screen name="OnBoardScreen" component={OnBoardingScreen} />
      <Stack.Screen name="Main" component={MainScreen} />
    </Stack.Navigator>
  );
};
export default Navigator;
const styles = StyleSheet.create({});
