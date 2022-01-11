import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  SafeAreaView,
  StyleSheet,
  View,
} from "react-native";

import { store } from "./src/redux/store";
import { Provider } from "react-redux";
import RootNavigation from "./src/navigation/Navigator";
import SplashScreen from "react-native-splash-screen";

require("./src/helpers/db");

const config = {
  webClientId:
    "768418404122-out2q1cfkp99u5bs6sb5gsnhs9tl98sl.apps.googleusercontent.com",

  scopes: ["profile", "email"],
  permissions: ["public_profile", "location", "email"],
  offlineAccess: true,
};
export default function App() {
  const [initializing, setInitializing] = useState(true);
  // const [user, setUser] = useState(null);
  const [splash, setSplash] = useState(true);

  // useEffect(() => {
  //   GoogleSignin.configure(config);

  //   const sub = auth().onAuthStateChanged((userInfo) => {
  //     if (userInfo) {
  //       dispatch(setUser)(userInfo);
  //       console.log("Connecte2de", userInfo);
  //     } else {
  //       console.log("no usser");
  //       dispatch(setUser)(null);

  //       console.log("Disconnected", userInfo);
  //     }
  //   });
  //   return sub;
  // }, []);

  useEffect(() => {
    SplashScreen.hide();
  });
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Provider store={store}>
        <RootNavigation />
        {/* <NavigationContainer>
        <StatusBar translucent />
        {user ? <LoggedStackScreen /> : <LoginStackScreen />}
      </NavigationContainer> */}
      </Provider>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
  },
});
