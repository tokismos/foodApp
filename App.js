import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import Navigator, {
  SignNavigator,
  TabScreen,
} from "./src/navigation/Navigator";
import auth from "@react-native-firebase/auth";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { COLORS } from "./src/consts/colors";
import { store } from "./src/redux/store";
import { Provider, useSelector } from "react-redux";
export default function App() {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();
  const [splash, setSplash] = useState(true);

  useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        "954088809444-g38fi65a2f6eotu2o57gekojchbv2d0l.apps.googleusercontent.com",
    });
    const subscriber = auth().onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
        console.log("Connecte2d", user);
        setSplash(false);
        if (initializing) setInitializing(false);
      } else {
        setUser();
        setInitializing(false);
        console.log("Disconnected", user);
      }
    });
    return subscriber; // unsubscribe on unmount
  }, []);

  if (initializing) return null;

  // const SplashScreen = () => {
  //   return (
  //     <View style={{ justifyContent: "center", alignItems: "center", flex: 1 }}>
  //       <ActivityIndicator size="large" color="#0000ff" />
  //     </View>
  //   );
  // };
  return (
    <Provider store={store}>
      <NavigationContainer>
        <StatusBar translucent />
        {user ? <Navigator /> : <SignNavigator />}
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
  },
});
