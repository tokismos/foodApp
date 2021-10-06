import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import Navigator, { TabScreen } from "./src/navigation/Navigator";
import FirstPage from "./src/screens/FirstPage";
import OnBoardingScreen from "./src/screens/OnBoardingScreen";
import {
  getAuth,
  onAuthStateChanged,
  FacebookAuthProvider,
  signInWithCredential,
} from "firebase/auth";
import { auth } from "./src/helpers/db";

export default function App() {
  const [user, setUser] = useState();
  const [splash, setSplash] = useState(true);
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        console.log("user connected", user);

        setUser(user);
        setSplash(false);
      } else {
        setUser();
        setSplash(false);
      }
    });
  }, []);
  const SplashScreen = () => {
    return (
      <View style={{ justifyContent: "center", alignItems: "center", flex: 1 }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  };
  return (
    <NavigationContainer>
      {splash ? <SplashScreen /> : user ? <TabScreen /> : <Navigator />}
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
  },
});
